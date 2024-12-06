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
        AND: [{ location: user?.location }],
      },
    });

    

    const groupedData = await prisma.inventoryItem.groupBy({
      by: ['category'], // Group by category
      _sum: {
        price: true, // Sum of quantity, if needed
      },
      _count: {
        _all: true, // Count of items in each group
      }
    });

    const categories = groupedData.map(group => (
      group.category
    )
    )

    const inventoryValues = groupedData.map(group => (
      group._count._all
    ))
  
    // Calculate total cost for each category
    const CostValues = groupedData.map(group => (
       group._sum.price? group._sum.price : 0 //
    ));

  const report = {
    metrics: [
      { label: "Total Devices", value: totalItems },
      { label: "Working Devices", value: 120 },
      { label: "Under Repair", value: 15 },
      { label: "Out of Order", value: 5 },
    ],
      inventoryOverview: {
        categories: categories,
        values: inventoryValues,
      
      },
      financialSummary: {
        categories: categories,
        values: CostValues,
      },
      compliance: {
        labels: ["Compliant", "Non-Compliant"],
        values: [90, 10],
      },
    };

   const data = {
      metrics: [
        { label: "Total Devices", value: 155 },
        { label: "Working Devices", value: 120 },
        { label: "Under Repair", value: 15 },
        { label: "Out of Order", value: 5 },
      ],
      inventoryOverview: [
        { category: "Desktops", count: 50 },
        { category: "Smartphones", count: 40 },
        { category: "Tablets", count: 10 },
      ],
      maintenanceStatus: {
        working: 86,
        underRepair: 11,
        outOfOrder: 3,
      },
      inventoryReport: [
        { itemId: 1, name: "Desktop", category: "Computers", currentStock: 50 },
        { itemId: 2, name: "Smartphone", category: "Mobiles", currentStock: 40 },
        { itemId: 3, name: "Tablet", category: "Tablets", currentStock: 10 },
      ],
      maintenanceReport: [
        { itemId: 1, name: "Desktop", issue: "Hardware Failure", startDate: "2024-11-20" },
        { itemId: 2, name: "Smartphone", issue: "Screen Damage", startDate: "2024-11-22" },
      ],
      discardedItems: [
        { itemId: 1, name: "Printer", reason: "Outdated", discardedDate: "2024-10-15" },
        { itemId: 2, name: "Monitor", reason: "Damaged", discardedDate: "2024-11-05" },
      ],
    }
  
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error creating request:", error);
    return NextResponse.json(
      { error: "Failed to create request" },
      { status: 500 },
    );
  }
}
