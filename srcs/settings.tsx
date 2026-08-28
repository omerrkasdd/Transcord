import { definePluginSettings } from "@api/Settings";
import { Button } from "@components/Button";
import { OptionType } from "@utils/types";

import { openTranscordModal } from "./TranscordModal";

export const settings = definePluginSettings({
    incomingTarget: {
        type: OptionType.STRING,
        description: "Language received messages are translated to",
        default: "en",
        hidden: true
    },
    outgoingTarget: {
        type: OptionType.STRING,
        description: "Language your messages are translated to",
        default: "en",
        hidden: true
    },
    incomingAuto: {
        type: OptionType.BOOLEAN,
        description: "Automatically translate new messages in the channel you are viewing",
        default: false
    },
    outgoingAuto: {
        type: OptionType.BOOLEAN,
        description: "Automatically translate your messages before sending",
        default: false
    },
    style: {
        type: OptionType.SELECT,
        description: "Translation style",
        options: [
            { label: "Natural", value: "natural", default: true },
            { label: "Casual", value: "casual" },
            { label: "Literal", value: "literal" }
        ] as const
    },
    smartTranslation: {
        type: OptionType.BOOLEAN,
        description: "Detect language automatically and preserve code, links, mentions and Discord formatting",
        default: true
    },
    inlineButton: {
        type: OptionType.BOOLEAN,
        description: "Show a small translate button below received messages",
        default: false
    },
    apiKey: {
        type: OptionType.STRING,
        displayName: "Groq API Key",
        description: "Groq API key used for translations",
        default: ""
    },
    model: {
        type: OptionType.STRING,
        description: "Groq model",
        default: "openai/gpt-oss-20b"
    },
    glossary: {
        type: OptionType.STRING,
        description: "Optional glossary. One rule per line",
        default: "",
        multiline: true
    },
    instructions: {
        type: OptionType.STRING,
        description: "Optional extra style instructions",
        default: "",
        multiline: true
    },
    bypassPrefix: {
        type: OptionType.STRING,
        description: "Messages starting with this prefix are sent without translation",
        default: "!raw "
    },
    manageLanguages: {
        type: OptionType.COMPONENT,
        component: () => (
            <Button onClick={openTranscordModal}>
                Languages & quick controls
            </Button>
        )
    }
});
