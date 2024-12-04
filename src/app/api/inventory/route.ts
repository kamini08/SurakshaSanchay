import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "../../../../auth";
import { db } from "@/lib/db";
// import { db } from '@/lib/db';

const prisma = new PrismaClient();

// Function to delete an inventory item (only for admins)
async function deleteInventoryItem(userId: string, itemId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  if (!user || user.role !== "admin") {
    return {
      success: false,
      message: "Permission denied: Only admins can delete inventory items.",
    };
  }

  await prisma.inventoryItem.delete({
    where: { itemId: itemId },
  });

  return { success: true, message: "Inventory item deleted successfully." };
}

// Function to add an inventory item (only for admins)

export async function POST(request: Request) {
  try {
    const session = await auth();
    const role = session?.user?.role;

    // Ensure the user has admin privileges
    if (role !== "admin") {
      return NextResponse.json(
        {
          success: false,
          message: "Permission denied: Only admins can add inventory items.",
        },
        { status: 403 },
      );
    }

    const data = await request.json();

    // Validate required fields
    if (!data.itemData.itemId || !data.itemData.category) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields: `itemId` or `category`.",
        },
        { status: 400 },
      );
    }

    // Check if user exists (if userId is provided)
    if (data.itemData.userId) {
      const user = await db.user.findUnique({
        where: {
          govId: data.itemData.userId,
        },
      });

      if (!user) {
        return NextResponse.json(
          {
            success: false,
            message: `User with ID ${data.itemData.userId} does not exist.`,
          },
          { status: 400 },
        );
      }
    }

    // Create the inventory item
    const newItem = await db.inventoryItem.create({
      data: {
        itemId: data.itemData.itemId,
        category:
          data.itemData.category === "communicationDevice"
            ? "COMMUNICATION_DEVICES"
            : data.itemData.category === "computerAndItEquipment"
              ? "COMPUTER_AND_IT_EQUIPMENT"
              : data.itemData.category === "networkingEquipment"
                ? "NETWORKING_EQUIPMENT"
                : data.itemData.category === "surveillanceAndTracking"
                  ? "SURVEILLANCE_AND_TRACKING"
                  : data.itemData.category === "vehicleAndAccessories"
                    ? "VEHICLE_AND_ACCESSORIES"
                    : data.itemData.category === "protectiveGear"
                      ? "PROTECTIVE_GEAR"
                      : data.itemData.category === "firearms"
                        ? "FIREARMS"
                        : data.itemData.category === "forensic"
                          ? "FORENSIC"
                          : data.itemData.category === "medicalFirstAid"
                            ? "MEDICAL_FIRST_AID"
                            : data.itemData.category === "officeSupplies"
                              ? "OFFICE_SUPPLIES"
                              : "OFFICE_SUPPLIES",
        type: data.itemData.type || null,
        description: data.itemData.description || null,
        quantity: parseInt(data.itemData.quantity) || 1,
        location: data.itemData.location || null,
        condition: data.itemData.condition || "new",
        acquisitionDate: data.itemData.acquisitionDate
          ? new Date(data.itemData.acquisitionDate)
          : null,
        expiryDate: data.itemData.expiryDate
          ? new Date(data.itemData.expiryDate)
          : null,
        price: parseFloat(data.itemData.price) || null,
        supplier: data.itemData.supplier || null,
        returnDate: data.itemData.returnDate || null,
        lastInspectionDate: data.itemData.lastInspectionDate
          ? new Date(data.itemData.lastInspectionDate)
          : null,
        maintenanceSchedule: data.itemData.maintenanceSchedule || null,
        maintenanceCharge: parseFloat(data.itemData.maintenanceCharge) || null,
        issuedTo: data.itemData.issuedTo || null,
        userId: data.itemData.userId || null,
      },
    });

    // Insert into category-specific table based on the category
    let categoryResponse;

    switch (data.itemData.category) {
      case "communicationDevice":
        categoryResponse = await db.communicationDevice.create({
          data: {
            inventoryItemId: newItem.itemId, // Use `newItem.id` for foreign key
            frequencyRange:
              data.itemData.categoryDetails?.communicationDevice
                ?.frequencyRange || null,
            batteryType:
              data.itemData.categoryDetails?.communicationDevice?.batteryType ||
              null,
            connectivity:
              data.itemData.categoryDetails?.communicationDevice
                ?.connectivity || null,
          },
        });
        break;

      case "computerAndITEquipment":
        categoryResponse = await db.computerAndITEquipment.create({
          data: {
            inventoryItemId: newItem.itemId, // Use `newItem.id` for foreign key
            processor:
              data.itemData.categoryDetails?.computerAndITEquipment.processor ||
              null,
            RAM:
              data.itemData.categoryDetails?.computerAndITEquipment.RAM || null,
            storage:
              data.itemData.categoryDetails?.computerAndITEquipment.storage ||
              null,
            OS:
              data.itemData.categoryDetails?.computerAndITEquipment.OS || null,
          },
        });
        break;

      case "networkingEquipment":
        categoryResponse = await db.networkingEquipment.create({
          data: {
            inventoryItemId: newItem.itemId, // Use `newItem.id` for foreign key
            bandwidth:
              data.itemData.categoryDetails?.networkingEquipment.bandwidth ||
              null,
            ports:
              data.itemData.categoryDetails?.networkingEquipment.ports || null,
            protocols:
              data.itemData.categoryDetails?.networkingEquipment.protocols ||
              null,
          },
        });
        break;
      case "surveillanceAndTracking":
        categoryResponse = await db.surveillanceAndTracking.create({
          data: {
            inventoryItemId: newItem.itemId, // Use `newItem.id` for foreign key
            cameraResolution:
              data.itemData.categoryDetails?.surveillanceAndTracking
                .cameraResolution || null,
            nightVision:
              data.itemData.categoryDetails?.surveillanceAndTracking
                .nightVision || null,
            GPSAccuracy:
              data.itemData.categoryDetails?.surveillanceAndTracking
                .GPSAccuracy || null,
          },
        });
        break;
      case "vehicleAndAccessories":
        categoryResponse = await db.vehicleAndAccessories.create({
          data: {
            inventoryItemId: newItem.itemId, // Use `newItem.id` for foreign key
            vehicleType:
              data.itemData.categoryDetails?.vehicleAndAccessories
                .vehicleType || null,
            makeAndModel:
              data.itemData.categoryDetails?.vehicleAndAccessories
                .makeAndModel || null,
            licensePlate:
              data.itemData.categoryDetails?.vehicleAndAccessories
                .licensePlate || null,
            engineCapacity:
              data.itemData.categoryDetails?.vehicleAndAccessories
                .engineCapacity || null,
            accessories:
              data.itemData.categoryDetails?.vehicleAndAccessories
                .accessories || null,
          },
        });
        break;
      case "protectiveGear":
        categoryResponse = await db.protectiveGear.create({
          data: {
            inventoryItemId: newItem.itemId, // Use `newItem.id` for foreign key
            protectionLevel:
              data.itemData.categoryDetails?.protectiveGear.protectionLevel ||
              null,
            size: data.itemData.categoryDetails?.protectiveGear.size || null,
            material:
              data.itemData.categoryDetails?.protectiveGear.material || null,
          },
        });
        break;
      case "firearms":
        categoryResponse = await db.firearm.create({
          data: {
            inventoryItemId: newItem.itemId, // Use `newItem.id` for foreign key
            caliber: data.itemData.categoryDetails?.firearm.caliber || null,
            ammoType: data.itemData.categoryDetails?.firearm.ammoType || null,
            serialNumber:
              data.itemData.categoryDetails?.firearm.serialNumber || null,
            licenseDetails:
              data.itemData.categoryDetails?.firearm.licenseDetails || null,
          },
        });
        break;
      case "forensic":
        categoryResponse = await db.forensicEquipment.create({
          data: {
            inventoryItemId: newItem.itemId, // Use `newItem.id` for foreign key
            usageType:
              data.itemData.categoryDetails?.forensicEquipment.usageType ||
              null,
            sensitivity:
              data.itemData.categoryDetails?.forensicEquipment.sensitivity ||
              null,
            storageRequirements:
              data.itemData.categoryDetails?.forensicEquipment
                .storageRequirements || null,
          },
        });
        break;
      case "medicalFirstAid":
        categoryResponse = await db.medicalFirstAid.create({
          data: {
            inventoryItemId: newItem.itemId, // Use `newItem.id` for foreign key
            expirationDate: data.itemData.categoryDetails?.medicalFirstAid
              .expirationDate
              ? new Date(
                  data.itemData.categoryDetails?.medicalFirstAid.expirationDate,
                )
              : null,

            dosage:
              data.itemData.categoryDetails?.medicalFirstAid.dosage || null,
            storageConditions:
              data.itemData.categoryDetails?.medicalFirstAid
                .storageConditions || null,
          },
        });
        break;
      case "officeSupplies":
        categoryResponse = await db.officeSupply.create({
          data: {
            inventoryItemId: newItem.itemId, // Use `newItem.id` for foreign key
            itemType:
              data.itemData.categoryDetails?.officeSupply.itemType || null,
            dimensions:
              data.itemData.categoryDetails?.officeSupply.dimensions || null,
            material:
              data.itemData.categoryDetails?.officeSupply.material || null,
          },
        });
        break;

      default:
        return NextResponse.json(
          {
            success: false,
            message: "Invalid category or unsupported category.",
          },
          { status: 400 },
        );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Inventory item added successfully.",
        data: { newItem, categoryResponse },
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Error in POST /api/inventory:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: error.message,
      },
      { status: 500 },
    );
  }
}

// DELETE handler (for deleting inventory item)
export async function DELETE(req: Request) {
  const session = await auth(); // Fetch session server-side
  const userId = session?.user.id;
  try {
    const { itemId } = await req.json();

    if (!userId || !itemId) {
      return NextResponse.json(
        { success: false, message: "userId and itemId are required." },
        { status: 400 },
      );
    }

    const response = await deleteInventoryItem(userId, itemId);

    if (response.success) {
      return NextResponse.json(response, { status: 200 });
    } else {
      return NextResponse.json(response, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: `Internal server error: ${error.message}` },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request) {
  try {
    const session = await auth(); // Fetch session server-side
    const userId = session?.user.id;
    const body = await req.json();
    const { itemId, fieldsToUpdate, childUpdates } = body;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user || user.role !== "admin") {
      return NextResponse.json({
        success: false,
        message: "Permission denied: Only admins can update inventory items.",
      });
    }

    if (!itemId || !fieldsToUpdate) {
      return new Response(
        JSON.stringify({ error: "itemId and fieldsToUpdate are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Build the update object
    const updateData = { ...fieldsToUpdate };

    // Add child updates dynamically if provided
    if (childUpdates) {
      for (const [childTable, updates] of Object.entries(childUpdates)) {
        updateData[childTable] = {
          update: updates, // Assumes `update` action for related records
        };
      }
    }

    // Perform the update
    const updatedItem = await prisma.inventoryItem.update({
      where: { itemId },
      data: updateData,
    });

    return new Response(
      JSON.stringify({
        message: "Item and related data updated successfully",
        updatedItem,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error: any) {
    console.error("Error updating inventory item and related data:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to update inventory item and related data",
        details: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}

export async function GET() {
  try {
    const session = await auth();
    const role = session?.user.role;
    const id = session?.user.id;
    const govIds = await db.user.findFirst({
      where: { id },
      select: { govId: true },
    });
    console.log(govIds);
    const govId = govIds?.govId;

    let inventoryData;
    if (role === "incharge") {
      inventoryData = await prisma.inventoryItem.findMany({
        where: { userId: govId },
      });
      console.log(inventoryData);
    } else {
      inventoryData = await prisma.inventoryItem.findMany();
    }

    // Return the data as a JSON response
    return NextResponse.json(inventoryData);
  } catch (error) {
    console.error("Error fetching inventory data: ", error);
    return NextResponse.json(
      { error: "Failed to fetch inventory data" },
      { status: 500 },
    );
  }
}
