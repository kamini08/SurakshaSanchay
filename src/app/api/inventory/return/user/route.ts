// route.ts
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../../auth";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const id = session?.user.id;
    const loc = await prisma.user.findUnique({
      where: { id: id },
      select: { location: true },
    });

    const incharge = await prisma.user.findFirst({
      where: {
        AND: [{ location: loc?.location }, { role: "incharge" }],
      },
    });

    const body = await req.json();

    const { userId, equipmentId, equipmentName, condition, notes } = body;

    // Validate the request body
    if (!userId || !equipmentId || !equipmentName || !condition) {
      return NextResponse.json(
        { error: "Invalid request payload" },
        { status: 400 },
      );
    }

    // Map condition to isLost and isDamaged
    let isLost = false;
    let isDamaged = false;
    if (condition === "lost") {
      isLost = true;
    } else if (condition === "damaged") {
      isDamaged = true;
    }

    const data = await prisma.returnRequest.create({
      data: {
        userId,
        itemId: equipmentId,
        equipmentName: equipmentName,
        name: session?.user.name || "",
        inchargeId: incharge?.govId || "",
        isLost,
        isDamaged,
        notes,
        returnDate: new Date(),
        date: new Date(),
      },
    });
    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create return request" },
      { status: 500 },
    );
  }
}
