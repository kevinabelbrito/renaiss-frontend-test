import { ChatService } from '@/services/chat.service';
import type { NextApiRequest, NextApiResponse } from 'next'

const chatService = new ChatService();
  
  export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method == 'POST') {
        const newChat = await chatService.create(req);
        res.status(201).json(newChat);
    }
    else if(req.method == 'GET') {
        const data = await chatService.get();
        res.status(200).json(data);
    }
    else if(req.method == 'PUT') {
        const data = await chatService.edit(req);
        if(!data) {
          res.status(404).json({ error: 'Chat not found' });
        }
        res.status(201).json(data);
    }
    else if(req.method =='DELETE') {
      const deleteChat = await chatService.delete(req);
      if(!deleteChat) {
        res.status(404).json({ error: 'Chat not found' });
      }
      res.status(204).send('');
    }
    else {
        res.status(405).send('');
    }
  }

  