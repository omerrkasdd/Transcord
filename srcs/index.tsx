import "./styles.css";

import { findGroupChildrenByChildId, type NavContextMenuPatchCallback } from "@api/ContextMenu";
import definePlugin from "@utils/types";
import type { Message } from "@vencord/discord-types";
import { ChannelStore, Menu, SelectedChannelStore, showToast, Toasts, UserStore } from "@webpack/common";

import { TranslateIcon, TranscordChatButton } from "./Icons";
import { settings } from "./settings";
import { showTranslation, TranslationAccessory } from "./TranslationAccessory";
import { translate } from "./utils";

const queue = new Map<string, Message>();
let timer: ReturnType<typeof setTimeout> | null = null;
let running = false;

async function translateMessage(message: Message, notify = true) {
    try {
        const result = await translate("incoming", message.content);
        if (result) showTranslation(message.id, result);
    } catch (error) {
        if (notify) {
            showToast(
                error instanceof Error ? error.message : "Translation failed",
                Toasts.Type.FAILURE
            );
        }
    }
}

async function flushQueue() {
    if (running) return;

    if (!settings.store.incomingAuto) {
        queue.clear();
        return;
    }

    running = true;

    try {
        const channelId = SelectedChannelStore.getChannelId();
        const items = Array.from(queue.values()).filter(message => message.channel_id === channelId);
        queue.clear();

        for (const message of items.slice(0, 8)) {
            await translateMessage(message, false);
        }
    } finally {
        running = false;

        if (queue.size && settings.store.incomingAuto) {
            scheduleQueue();
        }
    }
}

function scheduleQueue() {
    if (timer || running) return;

    timer = setTimeout(() => {
        timer = null;
        void flushQueue();
    }, 80);
}

const messageMenu: NavContextMenuPatchCallback = (children, { message }: { message: Message; }) => {
    if (!message?.content?.trim()) return;

    const me = UserStore.getCurrentUser();
    if (me && message.author?.id === me.id) return;

    const group = findGroupChildrenByChildId("copy-text", children);
    if (!group) return;

    const index = group.findIndex(item => item?.props?.id === "copy-text");

    group.splice(Math.max(index + 1, 0), 0, (
        <Menu.MenuItem
            id="transcord-translate"
            label="Translate"
            icon={TranslateIcon}
            action={() => void translateMessage(message)}
        />
    ));
};

export default definePlugin({
    name: "Transcord",
    description: "Smart multilingual translation for Discord powered by Groq",
    searchTerms: ["translate", "translation", "language", "groq"],
    tags: ["Chat", "Utility"],
    authors: [{ name: "omerkasdd", id: 0n }],
    settings,
    contextMenus: {
        message: messageMenu
    },
    chatBarButton: {
        icon: TranslateIcon,
        render: TranscordChatButton
    },

    renderMessageAccessory: props => <TranslationAccessory message={props.message} />,

    messagePopoverButton: {
        icon: TranslateIcon,
        render(message: Message) {
            const me = UserStore.getCurrentUser();

            if (!message?.content?.trim()) return null;
            if (me && message.author?.id === me.id) return null;

            return {
                label: "Translate",
                icon: TranslateIcon,
                message,
                channel: ChannelStore.getChannel(message.channel_id),
                onClick: () => void translateMessage(message)
            };
        }
    },

    async onBeforeMessageSend(_, message) {
        if (!settings.store.outgoingAuto || !message.content?.trim()) return;

        const prefix = settings.store.bypassPrefix;

        if (prefix && message.content.startsWith(prefix)) {
            message.content = message.content.slice(prefix.length);
            return;
        }

        if (message.content.startsWith("/")) return;

        try {
            const result = await translate("outgoing", message.content);
            if (result) message.content = result.text;
        } catch (error) {
            showToast(
                error instanceof Error ? error.message : "Translation failed",
                Toasts.Type.FAILURE
            );
            return { cancel: true };
        }
    },

    flux: {
        MESSAGE_CREATE({ message }: { message: Message; }) {
            if (!settings.store.incomingAuto || !message?.content?.trim()) return;
            if (SelectedChannelStore.getChannelId() !== message.channel_id) return;

            const me = UserStore.getCurrentUser();
            if (me && message.author?.id === me.id) return;

            queue.set(message.id, message);

            while (queue.size > 24) {
                const first = queue.keys().next().value;
                if (!first) break;
                queue.delete(first);
            }

            scheduleQueue();
        },

        CHANNEL_SELECT() {
            queue.clear();

            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
        }
    },

    stop() {
        queue.clear();

        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    }
});
