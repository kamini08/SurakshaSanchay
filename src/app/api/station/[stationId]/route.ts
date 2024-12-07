import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // Await params before using its properties
    const stationId = req.url.split("/").pop()?.replaceAll("%20", " ");
    console.log(stationId);
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

const categoryMap: Record<string, string> = {
  COMMUNICATION_DEVICES: "communicationDevice",
  COMPUTER_AND_IT_EQUIPMENT: "computerAndITEquipment",
  NETWORKING_EQUIPMENT: "networkingEquipment",
  SURVEILLANCE_AND_TRACKING: "surveillanceAndTracking",
  VEHICLE_AND_ACCESSORIES: "vehicleAndAccessories",
  PROTECTIVE_GEAR: "protectiveGear",
  FIREARMS: "firearms",
  FORENSIC: "forensic",
  MEDICAL_FIRST_AID: "medicalFirstAid",
  OFFICE_SUPPLIES: "officeSupplies",
};

export async function POST(req: Request) {
  try {
    // Get the data from the request body
    const { itemId, category } = await req.json();

    // Ensure itemId and category are provided
    if (!itemId || !category) {
      return NextResponse.json(
        { success: false, message: "Item ID and Category are required" },
        { status: 400 },
      );
    }
    const categoryValue = categoryMap[category];
    if (!categoryValue) {
      return NextResponse.json(
        { success: false, message: "Invalid category" },
        { status: 400 },
      );
    }

    try {
      console.log(itemId, category);

      const itemDetails = await db.inventoryItem.findFirst({
        where: { itemId: itemId },
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
      // Check if itemDetails is null or undefined
      if (!itemDetails) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Item details not found for the given Item ID and Category",
          },
          { status: 404 },
        );
      }
      const removeNullValues = (obj: Record<string, any>) => {
        return Object.fromEntries(
          Object.entries(obj).filter(([_, value]) => value != null), // Filters out null or undefined values
        );
      };

      // Remove null/undefined values from itemDetails
      const cleanedItemDetails = removeNullValues(itemDetails || {});
      console.log(cleanedItemDetails);
      return NextResponse.json({
        data: cleanedItemDetails,
        cat: categoryValue,
      });
    } catch (error) {
      console.error("Error fetching item details: ", error);
      return NextResponse.json(
        { success: false, message: "Failed to fetch item details" },
        { status: 500 },
      );
    }
  } catch (err) {
    console.error("Error in POST /api/getItemDetails:", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
