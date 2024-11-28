import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { stationId: string } },
) {
  try {
    // Await params before using its properties
    const { stationId } = params;

    // Ensure stationId is valid
    if (!stationId) {
      return NextResponse.json(
        { success: false, message: "Station ID is required" },
        { status: 400 },
      );
    }

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

      // Check if inventoryData is null or empty
      if (!inventoryData || inventoryData.length === 0) {
        return NextResponse.json(
          {
            success: false,
            message: "No inventory data found for this station",
          },
          { status: 404 },
        );
      }

      console.log("Fetched inventory data:", inventoryData); // Debug log
      return NextResponse.json(inventoryData);
    } catch (error) {
      console.log("Error fetching inventory data: ", error);
      return NextResponse.json(
        { success: false, message: "Failed to fetch inventory data" },
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
