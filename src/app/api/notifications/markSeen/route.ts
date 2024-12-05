import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PATCH(request: NextRequest) {
  try {
    // Parse the request body to get the ID
    const { id,seen } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Notification ID is required' },
        { status: 400 }
      );
    }

    // Update the notification's read status
    const notification = await prisma.notification.update({
      where: { id },
      data: { read: seen },
    });

    if (!notification) {
      return NextResponse.json(
        { error: 'Notification not found' },
        { status: 404 }
      );
    }

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
