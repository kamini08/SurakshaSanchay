import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";

export async function POST(request: Request) {
  try {
    const session = await auth();
    const id = session?.user.id;
    const govIds = await db.user.findFirst({
      where: { id },
      select: { govId: true },
    });
    const inchId = govIds?.govId; // This is the govId of the logged-in user
    const body = await request.json();
    console.log("Request Body:", body);

    const { itemId, govId, assignedDate, location, description, status } = body;

    const formattedAssignedDate = new Date(assignedDate).toISOString();
    // Check if the itemId exists in the InventoryItem table
    const itemExists = await db.inventoryItem.findUnique({
      where: { itemId },
    });

    if (!itemExists) {
      return NextResponse.json(
        { error: `Item with itemId ${itemId} does not exist.` },
        { status: 400 },
      );
    }

    // Check if the govId matches the logged-in user's inchId
    if (itemExists.userId !== inchId) {
      return NextResponse.json(
        { error: `You do not have permission to assign this item.` },
        { status: 403 }, // Forbidden status
      );
    }

    // If itemId exists and govId matches, insert into ItemLocationHistory
    const newEntry = await db.itemLocationHistory.create({
      data: {
        itemId,
        govId,
        assignedDate: formattedAssignedDate,
        location,
        status,
        description,
      },
    });

    return NextResponse.json(newEntry, { status: 200 });
  } catch (error) {
    console.error("Error inserting data:", error);
    return NextResponse.json(
      { error: "Failed to add record" },
      { status: 500 },
    );
  }
}
