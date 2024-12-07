import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const session = await auth();
    const role = session?.user.role;
    const userId = session?.user.id;

    if (role !== "incharge" || "admin") {
      return NextResponse.json({
        status: 403,
        body: "Forbidden",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    const totalItems = await prisma.inventoryItem.count({
      where: {
        location: user?.location,
      },
    });
    const workingItems = await prisma.inventoryItem.count({
      where: {
        AND: [
          { location: user?.location },
          { NOT: [{ condition: "damaged" }] },
        ],
      },
    });
    
    const damagedItems = await prisma.inventoryItem.count({
      where: {
        AND: [
          { location: user?.location },
          { condition: "damaged" },
        ],
      },
    });
    const discardedItems = await prisma.inventoryItem.count({
      where: {
        AND: [
          { location: user?.location },
          { condition: "discarded" },
        ],
      },
    });
    const lostItems = await prisma.inventoryItem.count({
      where: {
        AND: [
          { location: user?.location },
          { isLost: true },
        ],
      },
    });


    const groupedData = await prisma.inventoryItem.groupBy({
      by: ["category"], // Group by category
      _sum: {
        price: true, // Sum of quantity, if needed
      },
      _count: {
        _all: true, // Count of items in each group
      },
    });

    const categories = groupedData.map((group) => {
      category: group.category;
      count: group._count._all;

  });

  


  const maintenanceData = await prisma.maintenanceRequest.findMany(
    {
      
      select: {
        itemId: true,
        issueDescription: true,
        item: true,
        approvalDate: true,

      }
    }
  )

  const maintenanceValues: { itemId: string; issue: string; startDate: Date | null; }[] = [];
  maintenanceData.forEach(item => {
    const itemValue = {
      itemId: item.itemId,
      issue: item.issueDescription,
      startDate: item.approvalDate

    }
    maintenanceValues.push(itemValue);
    
  })
  const discardData = await prisma.maintenanceRequest.findMany(
    {
      where: {
          status: "DISCARDED",
      },
      select: {
        itemId: true,
        discardReason: true,
        completionDate: true,

      }
    }
  )

  const discardValues: { itemId: string; reason: string | null; discardedDate: Date | null; }[] = [];
  discardData.forEach(item => {
    const itemValue = {
      itemId: item.itemId,
      reason: item.discardReason,
      discardedDate: item.completionDate

    }
    discardValues.push(itemValue);
    
  })

    // Calculate total cost for each category
    const CostValues = groupedData.map(
      (group) => (group._sum.price ? group._sum.price : 0), //
    );

    const data = {
      metrics: [
        { label: "Total Devices", value: totalItems },
        { label: "Working Devices", value: workingItems },
        { label: "Under Repair", value: damagedItems },
        { label: "Out of Order", value: discardedItems },
        { label: "Lost", value: lostItems },
      ],

      inventoryOverview: categories,
      maintenanceStatus: {
        working: workingItems,
        underRepair: damagedItems,
        outOfOrder: discardedItems,
      },
      inventoryReport: categories,
      maintenanceReport: maintenanceValues,
      discardedItems: discardValues,
    };

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error creating request:", error);
    return NextResponse.json(
      { error: "Failed to create request" },
      { status: 500 },
    );
  }
}
