import { IssuanceRequest, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

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
      where: { id: userId },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 });
    }

    const incharge = await prisma.user.findFirst({
      where: { AND: [{ location }, { role: "INCHARGE" }] },
    });

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

    

    if (!incharge) {
      return NextResponse.json(
        { message: "Incharge not found!" },
        { status: 404 },
      );
    }
    
    const request = await prisma.issuanceRequest.create({
      data: {
        userId,
        itemId: inventoryItem?.itemId || "",
        inventoryItem: item,
        inchargeId: incharge?.govId,
        issueDescription: description,
        quantity,
        expectedDeliveryDate: new Date(expectedDeliveryDate),
        purpose,
        expectedUsageDuration,
        approvalNeededBy: new Date(approvalNeededBy),
        priorityLevel,
        isDamaged: false,
        status: "PENDING",
      },
      
    });

    return NextResponse.json(request, { status: 201 });
  } catch (error) {
    console.error("Error creating request:", error);
    return NextResponse.json(
      { error: "Failed to create request" },
      { status: 500 },
    );
  }
}
