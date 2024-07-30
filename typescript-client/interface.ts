export interface Chat {
    _id: string;
    CHAT_ID: number;
    CHAT_PROMPT: string;
    CHAT_RESPONSE: string;
    AI_MODEL: string;
    FROM_USER_ID: string;
    TO_USER_ID: string;
    BOT_ID: number;
    CONTEXT: string;
    CREATION_DATE: string;  // ISO 8601 string
    CREATED_BY: string;
    LAST_UPDATE_DATE: string;
    LAST_UPDATED_BY: string;
}
export interface ClaudeChat{
    role: string,
    content: string
}