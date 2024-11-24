import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "../../../../../auth";
const prisma=new PrismaClient();
// GET function to fetch user-specific maintenance requests


export async function GET() {
    const session = await auth(); // Fetch session server-side
    const userId = session?.user.id;
  if (!userId) {
    return NextResponse.json({ message: "User ID is required" }, { status: 400 });
  }

  try {
    // Fetch requests for the specified user
    const userRequests = await prisma.maintenanceRequest.findMany({
        include: {
            item: { select: {  category: true, type: true } },
          }, // Order by the request date, most recent first
    });

    return NextResponse.json(userRequests, { status: 200 });
  } catch (error) {
    console.error("Error fetching maintenance requests:", error);
    return NextResponse.json({ message: "Failed to fetch data" }, { status: 500 });
  }
}
