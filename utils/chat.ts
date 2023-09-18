import { Chat } from "@/interfaces/chat";
// import { LocalStorage } from "node-localstorage";

// const localStorage = new LocalStorage('/json-files')

export async function readChatData() {
    const value = localStorage.getItem("chatHistory")

    if (typeof value === 'string') {
        const parse = JSON.parse(value)
        return parse;
    }
    return [];
}

export async function writeChatData(chats: Chat[]) {
    localStorage.setItem('chatHistory', JSON.stringify(chats, null, 2));
}