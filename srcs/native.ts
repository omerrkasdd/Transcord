import type { IpcMainInvokeEvent } from "electron";

const chatUrl = "https://api.groq.com/openai/v1/chat/completions";
const modelsUrl = "https://api.groq.com/openai/v1/models";

export async function complete(_: IpcMainInvokeEvent, apiKey: string, body: string) {
    try {
        const response = await fetch(chatUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body
        });

        return {
            status: response.status,
            data: await response.text()
        };
    } catch (error) {
        return {
            status: -1,
            data: String(error)
        };
    }
}

export async function getModels(_: IpcMainInvokeEvent, apiKey: string) {
    try {
        const response = await fetch(modelsUrl, {
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        });

        return {
            status: response.status,
            data: await response.text()
        };
    } catch (error) {
        return {
            status: -1,
            data: String(error)
        };
    }
}
