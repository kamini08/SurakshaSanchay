// pages/api/item-location/route.ts

import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Request Body:", body);

    const { itemId, govId, location, description } = body;

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

    // If itemId exists, insert into ItemLocationHistory
    const newEntry = await db.itemLocationHistory.create({
      data: {
        itemId,
        govId,
        location,
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
