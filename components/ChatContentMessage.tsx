import { ChatMessage } from "@/interfaces/chat";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'

type ChatContentMessageProps = {
    chat: ChatMessage
}

export default function ChatContentMessage({chat}: ChatContentMessageProps) {
    const { role, content } = chat;

    const colorRole = role == 'user' ? 'text-emerald-600' : 'text-orange-primary';
    
    return (
        <div className="shadow-main bg-white p-7 mt-4">
            <div className="border-b border-gray-alternative border-opacity-35 pb-5">
                <span className={`${colorRole} text-base font-semibold`}>
                    {role == 'user' ? 'Kevin' : 'OdamaChat'}
                </span>
                <span className="ml-5 text-slate-400 font-medium text-sm">
                    05:00 pm
                </span>
            </div>
            <div className="py-7">
                <p className='text-slate-800 font-medium text-base'>
                    <ReactMarkdown children={content} remarkPlugins={[remarkGfm]} />
                </p>
            </div>
        </div>
    )
}
