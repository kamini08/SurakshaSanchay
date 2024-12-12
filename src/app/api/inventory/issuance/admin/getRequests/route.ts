import { User, IssuanceRequest, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "../../../../../../../auth";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user.id || "";

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 });
    }
    if (user?.role != "admin") {
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

    const returnData: any = [];

    for (let i = 0; i < requests.length; i++) {
      const available = await prisma.inventoryItem.count({
        where: {
          AND: [
            { type: requests[i].name },
            { issuedTo: null },
            { location: user.location },
          ],
        },
      });

      const item = {
        id: requests[i].id,
        category: requests[i].category,
        item: requests[i].name,
        quantity: requests[i].quantity,
        requesterName: requests[i].user?.name,
        department: requests[i].user?.location,
        description: requests[i].issueDescription,
        expectedUsageDuration: requests[i].expectedUsageDuration,
        priorityLevel: requests[i].priorityLevel,
        approvalNeededBy: new Date(requests[i].approvalNeededBy),
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
