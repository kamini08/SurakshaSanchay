import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const inventoryData = await db.inventoryItem.findMany();
    return NextResponse.json(inventoryData);
  } catch (error) {
    console.error("Error fetching inventory data: ", error);
    return NextResponse.json(
      { error: "Failed to fetch inventory data" },
      { status: 500 },
    );
  }
}
