import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    
  
    const body = await req.json(); // Parse request body
    const { userId, issueDescription, inventoryItem, inchargeId} = body;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user || user.role !== 'INCHARGE') {
      return { success: false, message: 'Permission denied!' };
    }
    const request = await prisma.issuanceRequest.create({
      data: {
        userId,
        inventoryItem,
        inchargeId,
        issueDescription,
        status: 'PENDING',
      },
    });

    return NextResponse.json(request, { status: 201 });

  } catch (error) {

    console.error('Error creating request:', error);
    return NextResponse.json({ error: 'Failed to create request' }, { status: 500 });

  }
}
