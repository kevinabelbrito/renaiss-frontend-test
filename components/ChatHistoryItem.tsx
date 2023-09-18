import { Chat } from '@/interfaces/chat';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass, faCheck, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ChatHistoryItemProps {
    currentChatId: string;
    chat: Chat
    selectToDelete: Function;
    deleteChat: Function;
    cancelDeleteChat: Function;
    setCurrentChat: Function;
}

export default function ChatHistoryItem({
    currentChatId,
    chat,
    selectToDelete,
    deleteChat,
    cancelDeleteChat,
    setCurrentChat
}: ChatHistoryItemProps) {
    const currentChatIdBackground = currentChatId === chat.id ? 'bg-orange-secondary bg-opacity-50' : '';
    return (
    <div className={`flex items-center justify-between mb-5 py-3 px-5 rounded-md hover:bg-orange-secondary hover:bg-opacity-50 transition-all duration-200 ${currentChatIdBackground}`}>
        <div
            className="flex gap-4 cursor-pointer"
            onClick={() => setCurrentChat(chat)}
        >
            <button
                type='button'
                className="rounded-full bg-orange-alternative text-white py-3 px-4"
            >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
            <div className="">
                <p className="text-base font-medium line-clamp-1">
                    {chat.title}
                </p>
                <span className="block text-slate-400 font-medium text-sm">
                    <FontAwesomeIcon icon={faClock} />
                    <span className='ml-1'>
                        Ayer, Quedan 3hrs
                    </span>
                </span>
            </div>
        </div>
        <div className="flex justify-between gap-5">
            {
                currentChatId === chat.id ? (
                    <>
                        <button
                            type="button"
                            className="chat-history-item-action"
                            onClick={() => deleteChat()}
                        >
                            <FontAwesomeIcon icon={faCheck} />
                        </button>
                        <button 
                            type="button"
                            className="chat-history-item-action"
                            onClick={() => cancelDeleteChat()}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </>
                ) : (
                    <button 
                        type="button"
                        className="chat-history-item-action"
                        onClick={() => selectToDelete()}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                )
            }
        </div>
    </div>
  )
}
