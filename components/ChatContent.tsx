import { faCirclePlus } from '@fortawesome/free-solid-svg-icons/faCirclePlus';
import ChatContentMessage from './ChatContentMessage'
import PromptForm from './PromptForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Chat } from '@/interfaces/chat';

type ChatContentProps = {
  currentChat: Chat
  setCurrentChat: Function
  chats: Chat[]
  setChats: Function
  loader: boolean
  setLoader: Function
  sidebarOptions: boolean
}

export default function ChatContent({
  currentChat,
  setCurrentChat,
  chats,
  setChats,
  loader,
  setLoader,
  sidebarOptions
}: ChatContentProps) {
  
  const newSearch = () => {
    setCurrentChat('');
    const formIdToFocus = !sidebarOptions ? 'edit-search-form' : 'new-search-form';
    const form = document.getElementById(formIdToFocus)?.focus();
  }

  return (
    <div className='border-main'>
      <div className="flex md:flex-nowrap flex-wrap md:justify-between justify-center items-center gap-3 py-5 px-7 bg-white border-b border-gray-alternative border-opacity-35">
        <h5 className="text text-slate-800 font-semibold text-base">
          {currentChat?.title ?? 'Odama Chat'}
        </h5>
        <button
          type='button'
          className="bg bg-orange-primary rounded-md text-white whitespace-nowrap px-5 py-3 hover:bg-opacity-70 transition-all duration-200"
          onClick={() => newSearch()}
        >
          <FontAwesomeIcon icon={faCirclePlus} />
          <span className="ml-3">
            Nueva busqueda
          </span>
        </button>
      </div>
      <div className="sm:p-7 p-3 overflow-scroll md:max-h-screen">
        {currentChat 
          ? currentChat.messages?.map(chat => (
          <ChatContentMessage
            chat={chat}
            key={chat.content}
          />
        )) : ''}
        {loader ? (
          <div className="bg-white rounded shadow-container-main p-3 my-5 text-center">
            <span className="text-slate-800 font-normal text-base">
              Generando respuesta...
            </span>
          </div>
        ) : ''}
      </div>
      <div className="bg-white p-7 border-t border-gray-alternative border-opacity-35">
        <PromptForm
          edit={!currentChat ? false : true}
          chats={chats}
          setChats={setChats}
          currentChat={currentChat}
          setCurrentChat={setCurrentChat}
          setLoader={setLoader}
          formInputId='edit-search-form'
        />
      </div>
    </div>
  )
}
