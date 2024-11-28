import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { stationId: string } },
) {
  try {
    const { stationId } = params;

    try {
      // Fetch data from the addInventory table
      const inventoryData = await db.inventoryItem.findMany({
        where: { location: stationId },
        include: {
          communicationDevice: true,
          computerAndITEquipment: true,
          networkingEquipment: true,
          surveillanceAndTracking: true,
          vehicleAndAccessories: true,
          protectiveGear: true,
          firearm: true,
          forensicEquipment: true,
          medicalFirstAid: true,
          officeSupply: true,
        },
      });

      // Return the data as a JSON response
      return NextResponse.json(inventoryData);
    } catch (error) {
      console.error("Error fetching inventory data: ", error);
      return NextResponse.json(
        { error: "Failed to fetch inventory data" },
        { status: 500 },
      );
    }
  } catch (err) {
    console.error("Error in GET /station/:stationId:", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
