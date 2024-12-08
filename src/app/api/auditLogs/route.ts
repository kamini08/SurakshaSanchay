import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// GET function to retrieve item assignment history
export async function GET(req: Request) {
  try {
    // Fetch the item assignment history for the given itemId
    const assignmentHistory = await db.itemAssignmentHistory.findMany();
    // console.log(assignmentHistory);

    // Check if any records were found
    if (assignmentHistory.length === 0) {
      return NextResponse.json(
        { message: "No assignment history found for this item." },
        { status: 404 },
      );
    }

    // Return the assignment history
    return NextResponse.json(assignmentHistory, { status: 200 });
  } catch (error) {
    console.error("Error fetching item assignment history:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
