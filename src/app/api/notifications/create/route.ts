import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Data = {
  message?: string;
  error?: string;
  notification?: any;
};

export async function POST(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { message, userId, inchargeId } = req.body;

  if (!message || !userId || !inchargeId) {
    return res.status(400).json({
      error: 'All fields are required: message, userId, inchargeId',
    });
  }

  try {
    const notification = await prisma.notification.create({
      data: {
        message,
        userId,
        inchargeId,
      },
    });

    return res.status(201).json({
      message: 'Notification created successfully',
      notification,
    });
  } catch (error) {
    console.error('Error creating notification:', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
