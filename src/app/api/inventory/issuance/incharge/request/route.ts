import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "../../../../../../../auth";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const session = await auth();
    const govIds = session?.user.govId;
    const loc = session?.user.location;
    if (!loc) {
      return NextResponse.json(
        { message: "No location provided!" },
        { status: 401 },
      );
    }
    if (!govIds) {
      return NextResponse.json(
        { message: "No govId provided!" },
        { status: 401 },
      );
    }
    const body = await req.json(); // Parse request body
    const {
      userId,
      description,
      category,
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
      where: { govId: govIds },
    });

    const admin = await prisma.user.findFirst({
      where: { role: "admin" },
    });

    // const inventoryItem = await prisma.inventoryItem.findMany({
    //   where: {
    //     AND: [
    //       { type: item },
    //       {
    //         userId: null,
    //       },
    //     ],
    //   },
    // });

    console.log(user);
    console.log(user?.role);

    if (!user || user.role !== "incharge") {
      return NextResponse.json(
        { success: false, message: "Permission denied!" },
        { status: 403 },
      );
    }
    const request = await prisma.issuanceRequest.create({
      data: {
        userId: govIds,
        name: item,
        category: category.toString().toUpperCase().replaceAll(" ", "_"),
        inchargeId: admin?.govId,
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
