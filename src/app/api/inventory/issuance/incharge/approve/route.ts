import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Parse request body
    const { userId, inchargeId, requestId, isApproved, discardReason } = body;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user || user.role !== "INCHARGE") {
        return NextResponse.json(
            { error: "Only Incharges can approve requests" },
            { status: 403 }
        )
    }

    if (isApproved) {

      const request = await prisma.issuanceRequest.update({
        where: { id: requestId },
        data: { status: "APPROVED", approvalDate: new Date() },
      });
      const res = await fetch(`${process.env.HOST_URL}/api/notifications/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: request.userId,
                requestId: request.id,
                message: `Your request ${request.id} has been approved`,
                inchargeId: request.inchargeId,
            }),
      });

      return NextResponse.json(request, { status: 201 });

    } else {

      const request = await prisma.issuanceRequest.update({
        where: { id: requestId },
        data: { status: "REJECTED", discardReason },
      });
      const res = await fetch(`${process.env.HOST_URL}/api/notifications/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: request.userId,
                requestId: request.id,
                message: `Your request ${request.id} has been rejected for the following reasons:
                ${request.discardReason}.`,
                inchargeId: request.inchargeId,
            }),
      });

      return NextResponse.json(request, { status: 400 });

    }


  } catch (error) {

    console.error("Error creating request:", error);

    return NextResponse.json(
      { error: "Failed to create request" },
      { status: 500 },
    );
  }
}
