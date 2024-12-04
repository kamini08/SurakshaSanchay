import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    
  
    const body = await req.json(); // Parse request body
    const {
      userId,
      description,
      item,
      location,
      quantity,
      expectedDeliveryDate,
      purpose,
      expectedUsageDuration,
      approvalNeededBy,
      priorityLevel,
    } = body;

    const user = await prisma.user.findUnique({
      where: { govId: userId },
      select: { role: true },
    });

   const admin = await prisma.user.findFirst({
    where: { role: 'admin' },
   })

    const inventoryItem = await prisma.inventoryItem.findFirst({
      where: {
        AND: [
          { type: item },
          {
            userId: null,
          },
        ],
      },
    });

    if (!user || user.role !== 'INCHARGE') {
      return NextResponse.json(
        { success: false, message: 'Permission denied!' },
        { status: 403 }
      );
    }
    const request = await prisma.issuanceRequest.create({
      data: {
        userId,
        itemId: inventoryItem?.itemId || "",
        inchargeId: admin?.govId,
        issueDescription: description,
        quantity,
        expectedDeliveryDate,
        purpose,
        expectedUsageDuration,
        approvalNeededBy,
        priorityLevel,
        isDamaged: false,
        status: "PENDING",
      },
    });

    return NextResponse.json(request, { status: 201 });

  } catch (error) {

    console.error('Error creating request:', error);
    return NextResponse.json({ error: 'Failed to create request' }, { status: 500 });

  }
}
