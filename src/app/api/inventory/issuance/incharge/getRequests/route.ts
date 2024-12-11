import { User, IssuanceRequest, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "../../../../../../../auth";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const returnData: any = [];
  try {
    const session = await auth();
    const userId = session?.user.id || "";

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 });
    }
    if (user?.role != "incharge") {
      return NextResponse.json({
        message: "You are not authorized to make this request",
        status: 401,
      });
    }

    const requests = await prisma.issuanceRequest.findMany({
      where: { inchargeId: user?.govId },
      include: {
        user: true,
      },
    });
    console.log(requests);

    for (let i = 0; i < requests.length; i++) {
      const available = await prisma.inventoryItem.count({
        where: {
          AND: [
            { type: requests[i].name },
            { userId: null },
            { location: user.location },
          ],
        },
      });

      const item = {
        requestId: requests[i].id,
        category: requests[i].category,
        item: requests[i].name,
        quantityRequested: requests[i].quantity,
        requestedBy: requests[i].user?.name,
        department: requests[i].user?.location,
        priorityLevel: requests[i].priorityLevel,
        requestDate: requests[i].createdAt,
        status: requests[i].status,
        availableQuantity: available,
      };

      returnData.push(item);
    }

    return NextResponse.json(returnData, { status: 201 });
  } catch (error) {
    console.error("Error finding request:", error);
    return NextResponse.json(
      { error: "Failed to create request" },
      { status: 500 },
    );
  }
}
