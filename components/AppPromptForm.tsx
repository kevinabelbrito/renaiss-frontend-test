import { Chat } from '@/interfaces/chat'
import PromptForm from './PromptForm'

type AppPromptFormProps = {
  chats: Chat[]
  setChats: Function
  currentChat: Chat
  setCurrentChat: Function
  setLoader: Function
}

export default function AppPromptForm({chats, setChats, currentChat, setCurrentChat, setLoader}: AppPromptFormProps) {
  
  return (
    <div className='shadow-main p-7 bg-white'>
      <h3 className='text-2xl font-sans font-semibold text-slate-800'>
        Sistema
      </h3>
      <p className='text text-gray-primary font-normal text-base my-3'>
        Para conseguir una respuesta adecuada a tus necesidades, escribe un prompt para el sistema.
      </p>
      <PromptForm
        edit={false}
        chats={chats}
        setChats={setChats}
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
        setLoader={setLoader}
        formInputId='new-search-form'
      />
    </div>
  )
}
