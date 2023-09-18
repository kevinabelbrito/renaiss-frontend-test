import { useState } from 'react';
import ChatHistoryItem from './ChatHistoryItem'
import { Chat } from '@/interfaces/chat';
import { deleteChat } from '@/server/chat';

type ChatHistotyProps = {
    chats: Chat[];
    setChats: Function
    currentChat: Chat
    setCurrentChat: Function
}

export default function ChatHistory({
  chats,
  setChats,
  currentChat,
  setCurrentChat
}: ChatHistotyProps) {

  const [currentChatId, setCurrentChatId] = useState<string>('');
  
  function selectToDelete (id: string) {
    console.log(id);
    setCurrentChatId(id);
  }

  function handleDeleteChat (id: string) {
    deleteChat(id)
    .then(res => {
      if(!res) {
        alert("Chat no encontrado");
        return;
      }
      const newChatList = chats.filter(chat => chat.id != id);
      setChats(newChatList);
      if(currentChat.id === id) {
        setCurrentChat({});
      }
      setCurrentChatId('');
    })
    .catch(err => {
      alert("Error en el servidor");
    })
  }

  function cancelDeleteChat () {
    setCurrentChatId('');
  }
  
  return (
    <div className='shadow-main bg-white'>
      <div className="px-7 py-5 border-b border-gray-alternative border-opacity-35">
        <h5 className='font font-semibold text-base text-slate-800'>
          Historial de Busquedas
        </h5>
      </div>
      <div className="p-7">
        {chats.map(chat => (
          <ChatHistoryItem
            currentChatId={currentChatId}
            chat={chat}
            key={chat.id}
            selectToDelete={() => selectToDelete(chat.id)}
            deleteChat={() => handleDeleteChat(chat.id)}
            cancelDeleteChat={() => cancelDeleteChat()}
            setCurrentChat={setCurrentChat}
          />
        ))}
      </div>
    </div>
  )
}
