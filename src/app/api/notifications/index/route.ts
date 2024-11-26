import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../../../auth';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const session = await auth(); // Fetch session server-side
  const inchargeId = session?.user.id;

  if (!inchargeId) {
    return NextResponse.json(
      { error: 'inchargeId is required' },
      { status: 400 }
    );
  }

  try {
  
    const notifications = await prisma.notification.findMany({
      where: {inchargeId},
      orderBy: { createdAt: 'desc' },
      include: { user: true },
    });
    return NextResponse.json({ notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
