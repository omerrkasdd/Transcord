import { Divider } from "@components/Divider";
import { FormSwitch } from "@components/FormSwitch";
import { Margins } from "@utils/margins";
import type { RenderModalProps } from "@vencord/discord-types";
import { Forms, Modal, openModal, SearchableSelect, useMemo } from "@webpack/common";

import { languages, type LanguageCode } from "./languages";
import { settings } from "./settings";

function LanguageSelect({ setting, title }: {
    setting: "incomingTarget" | "outgoingTarget";
    title: string;
}) {
    const value = settings.use([setting])[setting] as LanguageCode;
    const options = useMemo(() => languages.map(language => ({
        label: language.label,
        value: language.value
    })), []);

    return (
        <section className={Margins.bottom16}>
            <Forms.FormTitle tag="h3">{title}</Forms.FormTitle>
            <SearchableSelect
                options={options}
                value={value}
                placeholder="Select a language"
                maxVisibleItems={7}
                closeOnSelect={true}
                onChange={next => settings.store[setting] = next}
            />
        </section>
    );
}

function TranscordModal({ rootProps }: { rootProps: RenderModalProps; }) {
    const incomingAuto = settings.use(["incomingAuto"]).incomingAuto;
    const outgoingAuto = settings.use(["outgoingAuto"]).outgoingAuto;

    return (
        <Modal {...rootProps} title="Transcord">
            <LanguageSelect
                setting="outgoingTarget"
                title="Translate your messages to"
            />
            <LanguageSelect
                setting="incomingTarget"
                title="Translate received messages to"
            />
            <Divider className={Margins.bottom16} />
            <FormSwitch
                title="Outgoing auto translate"
                description={settings.def.outgoingAuto.description}
                value={outgoingAuto}
                onChange={value => settings.store.outgoingAuto = value}
                hideBorder
            />
            <FormSwitch
                title="Incoming auto translate"
                description={settings.def.incomingAuto.description}
                value={incomingAuto}
                onChange={value => settings.store.incomingAuto = value}
                hideBorder
            />
        </Modal>
    );
}

export function openTranscordModal() {
    openModal(props => <TranscordModal rootProps={props} />);
}
