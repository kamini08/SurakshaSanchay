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

    const data = requests.forEach((request) => ({
      requestId: request.id,
      category: request.category,
      item: request.name,
      quantityRequested: request.quantity,
      requestedBy: request.user?.name,
      department: request.user?.location,
      priorityLevel: request.priorityLevel,
      requestDate: request.createdAt,
      status: request.status,
      returnDate: "",
      remarks: "",
      assetTag: "",
    }));

    return NextResponse.json(requests, { status: 201 });
  } catch (error) {
    console.error("Error finding request:", error);
    return NextResponse.json(
      { error: "Failed to create request" },
      { status: 500 },
    );
  }
}
