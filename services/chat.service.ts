import { Chat } from "@/interfaces/chat";
import { createNewChat, editChat } from "@/utils/openai";
import { NextApiRequest } from "next";
import { readChatData, writeChatData } from "@/utils/chat";


export class ChatService {
    
    constructor() {}

    public async get(): Promise<Chat[]> {
        const data = await readChatData();
        return data;
    }
    
    public async create(req: NextApiRequest) {
        const { message } = req.body;
        const newChat = await createNewChat(message);
        const chats = await readChatData();
        chats.push(newChat);
        await writeChatData(chats);
        return newChat;
    }
    
    public async edit(req: NextApiRequest) {
        const message = req.body.message;
        const previousMessages = req.body.currentChat?.messages;
        const data = await editChat(previousMessages, message);
        const updatedChat = {
            id: req.body.currentChat?.id,
            title: req.body.currentChat?.title,
            messages: data
        };
        const chats = await readChatData();
        const index = chats.findIndex((chat: Chat) => chat.id === req.body.currentChat.id);

        if (index === -1) {
            return false;
        }

        chats[index] = { ...chats[index], ...updatedChat };
        await writeChatData(chats);

        return updatedChat;
    }

    public async delete(req: NextApiRequest) {
        const { id } = req.query;
        const chats = await readChatData();

        const index = chats.findIndex((chat: Chat) => chat.id === id);

        if (index === -1) {
            return false;
        }

        chats.splice(index, 1);

        await writeChatData(chats);
        return true;
    }
}