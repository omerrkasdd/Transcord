import { ChatBarButton, type ChatBarButtonFactory } from "@api/ChatButtons";
import { classes } from "@utils/misc";
import type { IconComponent } from "@utils/types";

import { openTranscordModal } from "./TranscordModal";
import { cl } from "./utils";
import { settings } from "./settings";

export const TranslateIcon: IconComponent = ({ height = 20, width = 20, className }) => (
    <svg viewBox="0 0 24 24" height={height} width={width} className={classes(cl("icon"), className)}>
        <path
            fill="currentColor"
            d="M12.9 15.6 9.7 12.4l.1-.1A22 22 0 0 0 14.5 4H18V2h-7V0H9v2H2v2h10.5A19.8 19.8 0 0 1 8.4 11 19 19 0 0 1 5.5 6H3.4a21 21 0 0 0 3.7 6.4L.7 18.7 2.1 20l6.3-6.3 3.9 3.9.6-2Zm5.6-7h-2L12 20h2l1.1-3h4.7l1.1 3H23L18.5 8.6Zm-2.7 6.5 1.7-4.5 1.7 4.5h-3.4Z"
        />
    </svg>
);

export const TranscordChatButton: ChatBarButtonFactory = ({ isMainChat }) => {
    const { incomingAuto, outgoingAuto } = settings.use(["incomingAuto", "outgoingAuto"]);

    if (!isMainChat) return null;

    const active = incomingAuto || outgoingAuto;

    return (
        <ChatBarButton
            tooltip="Transcord"
            onClick={openTranscordModal}
            onContextMenu={() => settings.store.outgoingAuto = !settings.store.outgoingAuto}
            buttonProps={{ "aria-haspopup": "dialog" }}
        >
            <span className={cl({ "chat-button": true, active })}>
                <TranslateIcon />
                {active && <span className={cl("status-dot")} />}
            </span>
        </ChatBarButton>
    );
};
