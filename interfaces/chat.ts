
export interface Chat {
    id: string;
    title: string;
    messages: ChatMessage[]
}

export interface ChatMessage {
    role: string;
    content: string;
}