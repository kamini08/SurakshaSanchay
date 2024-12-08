import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    // Parse the request body
    const { itemIds, location } = await req.json();

    // Validate the inputs
    if (!itemIds || !location) {
      return new Response(
        JSON.stringify({ error: "Missing itemId or location" }),
        { status: 400 }
      );
    }
    const issuedTo = await db.user.findFirst({
      where: { location: location, role: "incharge" },
      select: { govId: true }
    })

   // Update the inventory items
   const updatedItems = await Promise.all(
    itemIds.map(async (itemId: any) => {
      return db.inventoryItem.update({
        where: { itemId: itemId },
        data: { issuedTo: issuedTo?.govId },
        select: { itemId: true,issuedTo:true }
      });
    })
  );


      return NextResponse.json({
        message: "Items updated successfully",
        updatedItems: updatedItems,
    });
  } catch (error) {
      console.error("Error updating IssuedTo:", error);
      return NextResponse.json({
        message: "Failed to update IssuedTo",
        error: error,
      });
    }
  }
