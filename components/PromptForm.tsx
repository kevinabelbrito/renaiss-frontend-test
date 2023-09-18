import { useState } from 'react';
import { faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Chat } from '@/interfaces/chat';
import { createChat, updateChat } from '@/server/chat';

type PromptFormProps = {
    edit: boolean
    chats: Chat[]
    setChats: Function
    currentChat: Chat
    setCurrentChat: Function
    setLoader: Function
    formInputId?: string
}

export default function PromptForm({
    edit = false,
    chats,
    setChats,
    currentChat,
    setCurrentChat,
    setLoader,
    formInputId = ''
}: PromptFormProps) {
    const TOKENS_AVAILABLE = 1000;

    const [message, setMessage] = useState<string>('');
    const [sendForm, setSendForm] = useState<boolean>(false);
    const [currentTokens, setCurrentTokens] = useState<number>(0);

    const calculateTokens = (text: string) => {
        const tokenCount = Math.ceil(text.length / 4);
        return tokenCount;
    }

    const tokenTypeHandler = async (text: string) => {
        setMessage(text);
        const tokens = await calculateTokens(text);
        setCurrentTokens(tokens);
    }
    
    const sendChat = async () => {
        if(sendForm) {
            alert("El formulario ya fue enviado, por favor espere la respuesta.");
            return;
        }
        if(!message.length) {
            alert("El prompt no puede estar vacio.");
            return;
        }
        if(currentTokens < 1) {
            alert("El prompt debe tener al menos 1 token");
            return;
        }
        if(currentTokens > TOKENS_AVAILABLE) {
            alert(`El prompt supera los ${TOKENS_AVAILABLE} tokens permitidos.`);
            return;
        }
        setLoader(true);
        setSendForm(true);
        if(!edit || !currentChat) {
            await createNewChat();
        }
        else {
            await editChat();
        }
    }

    const createNewChat = () => {
        setCurrentChat({});
        createChat({message})
        .then(res => {
            const newChat = res;
            setChats([...chats, newChat]);
            setCurrentChat(newChat);
            setMessage('');
            setCurrentTokens(0);
            setLoader(false);
            setSendForm(false);
        }).catch(err => {
            alert("Hubo un error en el servidor");
            setLoader(false);
            setSendForm(false);
        });
    }

    const editChat = () => {
        updateChat({
            message,
            currentChat
        }).then(res => {
            const updatedChat = res;
            if(updatedChat.id.length) {
                const updatedChats = chats.map(chat => chat.id === updatedChat.id ? updatedChat : chat);
                setChats(updatedChats);
                setCurrentChat(updatedChat);
            }
            setMessage('');
            setCurrentTokens(0);
            setLoader(false);
            setSendForm(false);
        }).catch(err => {
            alert("Hubo un error en el servidor")
            setLoader(false);
            setSendForm(false);
        });
    }
    
    return (
    <div className="my-5 relative">
        <input
          type='text'
          className='border border-slate-300 rounded-sm block w-full p-3 pr-14 text-sm text-gray-primary font-normal placeholder:text-slate-300'
          placeholder='Insertar prompt'
          onChange={(e) => tokenTypeHandler(e.target.value)}
          value={message}
          id={formInputId}
        />
        <div className="p-3 absolute right-0 top-0 flex gap-4">
            <button 
                type='button'
                className='text-orange-primary hover:text-opacity-50 transition-all duration-200'
                onClick={() => sendChat()}
            >
                <FontAwesomeIcon icon={faPaperPlane} />
            </button>
            {
                edit ? (
                    <button className="text-emerald-600 hover:text-opacity-50 transition-all duration-200">
                        <FontAwesomeIcon icon={faWandMagicSparkles} />
                    </button> 
                ) : ''
            }
        </div>
        <div className="py-3 text-right font-normal text-slate-800">
            {currentTokens}/{TOKENS_AVAILABLE}
        </div>
    </div>
  )
}
