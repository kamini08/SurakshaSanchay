import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId');
const inchargeId = req.nextUrl.searchParams.get('inchargeId');

  if (!userId && !inchargeId) {
    return NextResponse.json(
      { error: 'Either userId or inchargeId is required' },
      { status: 400 }
    );
  }

  try {
    const whereCondition = {
      OR: [
        ...(userId ? [{ userId }] : []), // Include only if userId is provided
        ...(inchargeId ? [{ inchargeId }] : []), // Include only if inchargeId is provided
      ],
    };

    const notifications = await prisma.notification.findMany({
      where: whereCondition,
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
