import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Data = {
  message?: string;
  error?: string;
  notification?: any;
};

const handler: NextApiHandler<Data> = async (req, res) => {
  if (req.method === 'POST') {
    const { message, userId, inchargeId } = req.body;

    if (!message || !userId || !inchargeId) {
      return res
        .status(400)
        .json({ error: 'All fields are required: message, userId, inchargeId' });
    }

    try {
      const notification = await prisma.notification.create({
        data: {
          message,
          userId,
          inchargeId,
        },
      });

      return res
        .status(201)
        .json({ message: 'Notification created successfully', notification });
    } catch (error) {
      console.error('Error creating notification:', error);
      return res.status(500).json({ error: 'Something went wrong' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
};

export default handler;
