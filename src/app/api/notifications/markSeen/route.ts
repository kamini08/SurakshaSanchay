import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PATCH(req: {params: any}) {
  const { id } = req.params; // Use `await req.json()` to parse the request body.

  if (!id) {
    return NextResponse.json(
      { error: 'Notification ID is required' },
      { status: 400 }
    );
  }

  try {
    const notification = await prisma.notification.update({
      where: { id },
      data: { read: true },
    });

    return NextResponse.json({
      message: 'Notification marked as seen',
      notification,
    });
  } catch (error) {
    console.error('Error marking notification as seen:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
