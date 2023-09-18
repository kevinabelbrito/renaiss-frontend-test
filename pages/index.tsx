import { useState, useEffect } from 'react';
import { Inter } from 'next/font/google'
import NavBar from '@/components/NavBar'
import ChatContent from '@/components/ChatContent'
import AppPromptForm from '@/components/AppPromptForm'
import ChatHistory from '@/components/ChatHistory'
import { Chat } from '@/interfaces/chat';
import { getChats } from '@/server/chat';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat>(chats[0]);
  const [loader, setLoader] = useState<boolean>(false);
  const [sidebarOptions, setSidebarOptions] = useState<boolean>(true);

  useEffect(() => {
    getChats()
    .then(res => {
      const loadedChats = res;
      setChats(loadedChats);
      if (loadedChats.length) {
        setCurrentChat(loadedChats[0]);
      }
    })
  }, [])
  

  return (
    <>
      <main className=''>
        <NavBar
          sidebarOptions={sidebarOptions}
          setSidebarOptions={setSidebarOptions} 
        />
        <div className="flex lg:flex-nowrap flex-wrap justify-stretch p-5 lg:space-x-5 ">
          <div className={`${sidebarOptions ? 'lg:w-1/3 w-full' : 'hidden'} lg:mb-0 mb-5 space-y-5`}>
            <AppPromptForm
              chats={chats}
              setChats={setChats}
              currentChat={currentChat}
              setCurrentChat={setCurrentChat}
              setLoader={setLoader}
            />
            
            <ChatHistory
              chats={chats}
              setChats={setChats}
              currentChat={currentChat}
              setCurrentChat={setCurrentChat}
            />
          </div>
          <div className={sidebarOptions ? 'lg:w-2/3 w-full' : 'w-full'}>
            <ChatContent
              currentChat={currentChat}
              setCurrentChat={setCurrentChat}
              chats={chats}
              setChats={setChats}
              loader={loader}
              setLoader={setLoader}
              sidebarOptions={sidebarOptions}
            />
          </div>
        </div>
      </main>
    </>
  )
}