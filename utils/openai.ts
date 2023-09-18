import OpenAI from "openai";
import { ChatCompletionMessage } from "openai/resources/chat/index.mjs";

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

export async function createNewChat(message: string) {

    const chatMessages: ChatCompletionMessage[] = [{ role: 'user', content: message }];
    
    const completion = await chatCompletion(chatMessages);
    
    chatMessages.push(completion.choices[0].message);

    return {
        id: completion.id,
        title: await createChatTitle(message),
        messages: chatMessages
    };
}

export async function editChat(messages: Array<ChatCompletionMessage>, message: string) {
    const chatMessages = messages;
    chatMessages.push({ role: 'user', content: message});
    const completion = await chatCompletion(chatMessages);
    chatMessages.push(completion.choices[0].message);
    return chatMessages;
}

async function chatCompletion(chatMessages: Array<ChatCompletionMessage>) {
    return await openai.chat.completions.create({
        messages: chatMessages,
        model: "gpt-3.5-turbo",
        max_tokens: 1000,
        temperature: 0.2
    })
}

async function createChatTitle(message: string) {
    const chatMessages: ChatCompletionMessage = {
        role: 'user',
        content: `Give me a title for this prompt: "${message}" in a plaintext without ""`
    };
    
    const completion = await chatCompletion([chatMessages]);

    return completion.choices[0].message.content;
}