import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { it } from "node:test";

const prisma = new PrismaClient();

export async function PUT(req: Request) {
  try {
    const body = await req.json(); // Parse request body
    const { userId, name, quantity, requestId, isApproved, discardReason } =
      body;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { error: "Only Admins can approve requests" },
        { status: 403 },
      );
    }

    if (isApproved) {
      const request = await prisma.issuanceRequest.update({
        where: { id: requestId },
        data: { status: "APPROVED", approvalDate: new Date() },
      });

      const items = await prisma.inventoryItem.findMany({
        take: quantity,
        where: {
          AND: [
            { type: name },
            {
              userId: null,
            },
            {
              issuedTo: null,
            },
          ],
        },
      });

      if (items.length == 0) {
        return NextResponse.json(
          { error: "Not enough items available" },
          { status: 404 },
        );
      }
      // Update inventory items

      items.map(async (item) => {
        await prisma.inventoryItem.update({
          where: { itemId: item.itemId },
          data: {
            issuedTo: userId,
          },
        });
      });

      const res = await fetch(
        `${process.env.HOST_URL}/api/notifications/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: request.userId,
            requestId: request.id,
            message: `Your request ${request.id} has been approved`,
            inchargeId: request.inchargeId,
          }),
        },
      );
      return NextResponse.json(request, { status: 201 });
    } else {
      const request = await prisma.issuanceRequest.update({
        where: { id: requestId },
        data: { status: "REJECTED", discardReason },
      });

      const res = await fetch(
        `${process.env.HOST_URL}/api/notifications/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: request.userId,
            requestId: request.id,
            message: `Your request ${request.id} has been rejected for the following reasons:
                ${request.discardReason}.`,
            inchargeId: request.inchargeId,
          }),
        },
      );

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
