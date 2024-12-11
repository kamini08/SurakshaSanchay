import { PrismaClient } from "@prisma/client";
import { Session } from "inspector";
import { NextResponse } from "next/server";
import { it } from "node:test";
import { auth } from "../../../../../../../auth";
import { sendingEmail } from "@/lib/mail";

const prisma = new PrismaClient();

export async function PUT(req: Request) {
  try {
    const body = await req.json(); // Parse request body
    const {requestId, status, discardReason } =
      body;

      const session = await auth();
      const userId = session?.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { error: "Only Admins can approve requests" },
        { status: 403 },
      );
    }
    

    if (status == "APPROVED") {
      const request = await prisma.issuanceRequest.update({
        where: { id: requestId },
        data: { status: "APPROVED", approvalDate: new Date() },
        include: {
          user: true,
        }
    });

      const items = await prisma.inventoryItem.findMany({
        take: request.quantity,
        where: {
          AND: [
            { type: request.name },
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

      console.log(request.user.govId);

      const bhoomi = await prisma.notification.create({
        data: {
          userId: user.govId || "",
          inchargeId: request.user.govId || "",
          message: `Issuance request approved by ${request.user?.name} having govId ${userId}. `,
        },
      });
      const incharge = await prisma.user.findUnique({
        where: { govId: request.inchargeId || "" },
      });
      await sendingEmail(incharge?.email as string, bhoomi.message);

      return NextResponse.json(request, { status: 201 });
    } else {
      
      const request = await prisma.issuanceRequest.update({
        where: { id: requestId },
        data: { status: "REJECTED", discardReason },
        include: {
          user: true,
        }
      });

      const bhoomi = await prisma.notification.create({
        data: {
          userId: request.userId || "",
          inchargeId: request.inchargeId || "",
          message: `Issuance request rejected by ${request.user?.name} having govId ${userId}. `,
        },
      });
      const incharge = await prisma.user.findUnique({
        where: { govId: request.inchargeId || "" },
      });
      await sendingEmail(incharge?.email as string, bhoomi.message);

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
