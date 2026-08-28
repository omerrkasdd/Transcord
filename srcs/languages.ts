export type LanguageCode =
    | "af" | "ar" | "az" | "bg" | "bn" | "ca" | "cs" | "da" | "de" | "el"
    | "en" | "es" | "et" | "fa" | "fi" | "fil" | "fr" | "he" | "hi" | "hr"
    | "hu" | "hy" | "id" | "is" | "it" | "ja" | "ka" | "kk" | "ko" | "lt"
    | "lv" | "ms" | "nl" | "no" | "pl" | "pt" | "ro" | "ru" | "sk" | "sl"
    | "sr" | "sv" | "sw" | "th" | "tr" | "uk" | "ur" | "uz" | "vi" | "zh";

export const languages: ReadonlyArray<{ label: string; value: LanguageCode; }> = [
    { label: "Afrikaans", value: "af" },
    { label: "Arabic", value: "ar" },
    { label: "Azerbaijani", value: "az" },
    { label: "Bulgarian", value: "bg" },
    { label: "Bengali", value: "bn" },
    { label: "Catalan", value: "ca" },
    { label: "Czech", value: "cs" },
    { label: "Danish", value: "da" },
    { label: "German", value: "de" },
    { label: "Greek", value: "el" },
    { label: "English", value: "en" },
    { label: "Spanish", value: "es" },
    { label: "Estonian", value: "et" },
    { label: "Persian", value: "fa" },
    { label: "Finnish", value: "fi" },
    { label: "Filipino", value: "fil" },
    { label: "French", value: "fr" },
    { label: "Hebrew", value: "he" },
    { label: "Hindi", value: "hi" },
    { label: "Croatian", value: "hr" },
    { label: "Hungarian", value: "hu" },
    { label: "Armenian", value: "hy" },
    { label: "Indonesian", value: "id" },
    { label: "Icelandic", value: "is" },
    { label: "Italian", value: "it" },
    { label: "Japanese", value: "ja" },
    { label: "Georgian", value: "ka" },
    { label: "Kazakh", value: "kk" },
    { label: "Korean", value: "ko" },
    { label: "Lithuanian", value: "lt" },
    { label: "Latvian", value: "lv" },
    { label: "Malay", value: "ms" },
    { label: "Dutch", value: "nl" },
    { label: "Norwegian", value: "no" },
    { label: "Polish", value: "pl" },
    { label: "Portuguese", value: "pt" },
    { label: "Romanian", value: "ro" },
    { label: "Russian", value: "ru" },
    { label: "Slovak", value: "sk" },
    { label: "Slovenian", value: "sl" },
    { label: "Serbian", value: "sr" },
    { label: "Swedish", value: "sv" },
    { label: "Swahili", value: "sw" },
    { label: "Thai", value: "th" },
    { label: "Turkish", value: "tr" },
    { label: "Ukrainian", value: "uk" },
    { label: "Urdu", value: "ur" },
    { label: "Uzbek", value: "uz" },
    { label: "Vietnamese", value: "vi" },
    { label: "Chinese", value: "zh" }
];

export function languageName(code: string) {
    return languages.find(language => language.value === code)?.label ?? code.toUpperCase();
}
