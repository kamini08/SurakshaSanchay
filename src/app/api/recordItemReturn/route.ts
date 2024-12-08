import { db } from "@/lib/db";
import { auth } from "../../../../auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await auth();
    const id = session?.user.id;
    const govID = await db.user.findUnique({
      where: { id: id },
      select: { govId: true },
    });
    console.log(govID?.govId);

    const data = await db.returnRequest.findMany({
      where: { inchargeId: govID?.govId },
    });
    console.log(data);
    return new Response(JSON.stringify(data), {
      status: 200,
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id } = body; // Assuming the request body contains the ID of the return request
    if (!id) {
      return NextResponse.json(
        { error: "Invalid request: ID is required" },
        { status: 400 },
      );
    }
    // Update the returnStatus to "Completed"
    const updatedReturnRequest = await db.returnRequest.updateMany({
      where: { itemId: id },
      data: {
        returnStatus: "Completed",
        // Confirm the return
      },
    });

    const updatedItemInventory = await db.inventoryItem.updateMany({
      where: { itemId: id },
      data: {
        issuedTo: null,
      },
    });

    return NextResponse.json(updatedReturnRequest, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to update return status" },
      { status: 500 },
    );
  }
}
