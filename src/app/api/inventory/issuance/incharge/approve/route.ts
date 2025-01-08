import { sendingEmail } from "@/lib/mail";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req: Request) {
  try {
    const body = await req.json(); // Parse request body
    const {
      userId,
      category,
      name,
      inchargeId,
      requestId,
      isApproved,
      discardReason,
    } = body;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.role !== "incharge") {
      return NextResponse.json(
        { error: "Only Incharges can approve requests" },
        { status: 403 },
      );
    }

    if (isApproved) {
      try {
        const request = await prisma.issuanceRequest.update({
          where: { id: requestId },
          data: { status: "APPROVED", approvalDate: new Date() },
          include: {
            user: true,
          },
        });
        const item = await prisma.inventoryItem.findFirst({
          where: {
            AND: [
              { type: name },
              {
                userId: null,
              },
              {
                issuedTo: user?.govId,
              },
              {
                location: user.location,
              },
            ],
          },
        });
        const updateItem = await prisma.inventoryItem.update({
          where: {
            itemId: item?.itemId,
          },
          data: {
            status: "UNAVAILABLE",
            userId,
          },
        });
        const bhoomi = await prisma.notification.create({
          data: {
            userId: request.userId || "",
            inchargeId: request.inchargeId || "",
            message: `issuance request approved by ${request.user?.name} having govId ${userId}. `,
          },
        });
        const incharge = await prisma.user.findUnique({
          where: { id: inchargeId },
        });
        await sendingEmail(incharge?.email as string, bhoomi.message);

        return NextResponse.json(request, { status: 201 });
      } catch (error) {
        console.error("Error creating request:", error);

        return NextResponse.json(
          { error: "Failed to create request" },
          { status: 500 },
        );
      }
    } else {
      const request = await prisma.issuanceRequest.update({
        where: { id: requestId },
        data: { status: "REJECTED", discardReason },
        include: {
          user: true,
        },
      });

      const bhoomi = await prisma.notification.create({
        data: {
          userId: request.userId || "",
          inchargeId: request.inchargeId || "",
          message: `Issuance request created by ${request.user?.name} having govId ${userId}. `,
        },
      });
      const incharge = await prisma.user.findUnique({
        where: { id: inchargeId },
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
