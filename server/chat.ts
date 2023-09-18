import { HttpRequest } from "@/client/http";
import { Chat } from "@/interfaces/chat";
import { readChatData, writeChatData } from "@/utils/chat";
import { createNewChat, editChat } from "@/utils/openai";

const http = new HttpRequest();
const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/chat`;

export async function getChats() {
    const data = await readChatData();
    return data;
}

export async function createChat(body: {message: string}) {
    const newChat = await createNewChat(body.message);
    const chats = await readChatData();
    chats.push(newChat);
    await writeChatData(chats);
    return newChat;
}

export async function updateChat(body: any) {
    const message = body.message;
    const previousMessages = body.currentChat?.messages;
    const data = await editChat(previousMessages, message);
    const updatedChat = {
        id: body.currentChat.id,
        title: body.currentChat.title,
        messages: data
    };
    const chats = await readChatData();
    const index = chats.findIndex((chat: Chat) => chat.id === body.currentChat.id);

    if (index === -1) {
        return {
            id: '',
            title: '',
            messages: []
        };
    }

    chats[index] = { ...chats[index], ...updatedChat };
    await writeChatData(chats);

    return updatedChat;
}

export async function deleteChat(id: string) {
    const chats = await readChatData();

    const index = chats.findIndex((chat: Chat) => chat.id === id);

    if (index === -1) {
        return false;
    }

    chats.splice(index, 1);

    await writeChatData(chats);
    return true;
}