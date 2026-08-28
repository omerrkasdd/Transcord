import type { Message } from "@vencord/discord-types";
import { Parser, useEffect, useState } from "@webpack/common";

import { TranslateIcon } from "./Icons";
import { cl, type Translation } from "./utils";

const setters = new Map<string, (value?: Translation) => void>();

export function showTranslation(messageId: string, value: Translation) {
    setters.get(messageId)?.(value);
}

export function TranslationAccessory({ message }: { message: Message; }) {
    const [translation, setTranslation] = useState<Translation>();

    useEffect(() => {
        if ((message as any).vencordEmbeddedBy) return;

        setters.set(message.id, setTranslation);

        return () => void setters.delete(message.id);
    }, [message.id]);

    if (!translation) return null;

    return (
        <div className={cl("result")}>
            <TranslateIcon width={16} height={16} className={cl("result-icon")} />
            <div className={cl("result-body")}>
                <div className={cl("result-text")}>{Parser.parse(translation.text)}</div>
                <div className={cl("result-meta")}>
                    {translation.targetLanguage}
                    <button className={cl("dismiss")} onClick={() => setTranslation(undefined)}>
                        Dismiss
                    </button>
                </div>
            </div>
        </div>
    );
}
