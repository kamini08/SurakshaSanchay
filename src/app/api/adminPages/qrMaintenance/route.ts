import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "../../../../../auth";
import { db } from "@/lib/db";
import { sendingEmail } from "@/lib/mail";

const prisma = new PrismaClient();

const domain = process.env.DOMAIN;
export async function PUT(req: Request) {
  try {
    const session = await auth();
    const name = session?.user.name;
    if (!name) {
      return NextResponse.json({ message: "No name" }, { status: 400 });
    }
    const userId = session.user.id;
    if (!userId) {
      return NextResponse.json({ message: "No userId" }, { status: 400 });
    }
    const goveId = session.user.govId;
    if (!goveId) {
      return NextResponse.json({ message: "No govId" }, { status: 400 });
    }
    const userLocation = session.user.location;
    // const user = await prisma.user.findFirst({
    //   where: { govId: goveId },
    //   select: { id: true, location: true, type: true },
    // });
    // console.log("acacacasC", user);
    // if (!user) {
    //   return NextResponse.json({ message: "User not found" }, { status: 404 });
    // }
    // const userLocation = user.location;
    const { itemId, temporaryLocation } = await req.json();

    const data = await prisma.inventoryItem.findFirst({
      where: { itemId },
      select: { type: true, category: true },
    });

    if (!data) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }
    const incharge = await prisma.user.findFirst({
      where: { AND: { role: "incharge", location: userLocation } },
      select: { email: true, id: true, govId: true },
    });
    // console.log("cacacd", incharge);

    if (!incharge) {
      return NextResponse.json(
        {
          success: false,
          message: `No incharge found for location '${userLocation}'.`,
        },
        { status: 404 },
      );
    }
    // console.log("dcscscscs", temporaryLocation);
    const newRequest = await prisma.maintenanceRequest.create({
      data: {
        issueDescription: temporaryLocation,
        govId: incharge.govId,
        user: {
          connect: { govId: goveId },
        },
        item: {
          connect: { itemId },
        },
        // requestDate: new Date(),
      },
    });
    // console.log("donee, " + newRequest);

    // Create a notification for the incharge
    const bhoomi = await prisma.notification.create({
      data: {
        userId: userId,
        inchargeId: incharge.id,
        message: `New maintenance request created by ${name} having govId ${goveId}. `,
      },
    });
    // console.log("donee, " + bhoomi);
    await sendingEmail(incharge.email as string, bhoomi.message);
    return NextResponse.json(
      { success: true, data: newRequest },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error updating item:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
