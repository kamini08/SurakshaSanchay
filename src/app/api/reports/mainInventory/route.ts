import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { db } from "@/lib/db";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const session = await auth();
    const role = session?.user.role;
    const userId = session?.user.id;

    if (role !== "admin") {
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
    const oneMonthsAgo = new Date();
    oneMonthsAgo.setMonth(oneMonthsAgo.getMonth() - 2);
    const newProcurements = await prisma.inventoryItem.count({
      where: {
        acquisitionDate: {
          gte: oneMonthsAgo,
        },
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

    const categories = groupedData.map((group) => group.category);

    const inventoryValues = groupedData.map((group) => group._count._all);

    // Calculate total cost for each category
    const CostValues = groupedData.map((group) =>
      group._sum.price ? group._sum.price : 0, //
    );
    const workingItems = await prisma.inventoryItem.count({
      where: {
        AND: [
          {
            condition: "good",
          },
          {
            issuedTo: null,
          }
        ],
      },
    })

    const damagedItems = await prisma.inventoryItem.count({
      where: {
        AND: [
          {
            condition: "damaged",
          },
          {
            issuedTo: null,
          }
        ],
      },
    })

    const totalValue = await prisma.inventoryItem.count({
      where: {
        price: {
          gt: 0,
        },
      },
    });

    const report = {
      summary: {
        totalInventoryValue: totalValue,
        totalItems: totalItems,
        newProcurements: newProcurements,
        reorderStatus: 12,
        complianceStatus: "95%",
      },
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

    console.log(report);

    return NextResponse.json({...report, totalItems, workingItems, damagedItems}, { status: 201 });
  } catch (error) {
    console.error("Error creating request:", error);
    return NextResponse.json(
      { error: "Failed to create request" },
      { status: 500 },
    );
  }
}
