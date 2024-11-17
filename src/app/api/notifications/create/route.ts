import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
  const { message, userId, inchargeId } = await req.json();

  if (!message || !userId || !inchargeId) {
    return NextResponse.json(
      { error: 'All fields are required: message, userId, inchargeId' },
      { status: 400 }
    );
  }

  try {
    const notification = await prisma.notification.create({
      data: {
        message,
        userId,
        inchargeId,
      },
    });
    
    return NextResponse.json({
      message: 'Notification created successfully',
      notification,
    });
  } catch (error) {
    console.error('Error creating notification:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
