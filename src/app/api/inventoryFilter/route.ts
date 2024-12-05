import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "../../../../auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const role = session?.user.role;
    const id = session?.user.id;
    const govIds = await db.user.findFirst({
      where: { id },
      select: { govId: true },
    });
    const govId = govIds?.govId;
    const body = await req.json();
    const { category, location, status } = body || {};

    // console.log("Category:", category);
    // console.log("Location:", location);

    const query: any = {};
    if (category) {
      query.category = category;
    }
    if (location) {
      query.location = location;
    }
    if (status) {
      query.status = status;
    }
    const whereCondition = {
      ...query, // Spread the query object
      ...(role === "incharge" && { userId: govId }), // Add userId if role is "incharge"
    };

    const data = await db.inventoryItem.findMany({
      where: whereCondition,
    });

    // console.log("Fetched data:", data);

    // Return the fetched data as a JSON response
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("Error fetching inventory data:", err);

    return NextResponse.json(
      { error: "Failed to fetch inventory data" },
      { status: 500 },
    );
  }
}
