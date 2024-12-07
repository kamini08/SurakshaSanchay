import { ComplianceStatus, Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";

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

    const reports = await prisma.user.findMany({
      where: {
        location: user?.location,
    },

    include: {
 
      Policies: true,
      Stock: true,

      
    }
  });

    const totalItems = await prisma.inventoryItem.count({
      where: {
        AND: [{ location: user?.location }],
      },
    });
    const oneMonthsAgo = new Date();
    oneMonthsAgo.setMonth(oneMonthsAgo.getMonth() - 2);
    const newProcurements = await prisma.inventoryItem.findMany({
      where: {
        acquisitionDate: {
          gte: oneMonthsAgo,
        },
      },
    });

    const groupedData = await prisma.inventoryItem.groupBy({
      by: ['category'],
      _sum: {
        price: true, 
      },
      _count: {
        _all: true,
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

    const complianceData = {
      policies: [
        { policy: "Procurement Policies", status: "Compliant", percentage:  },
        { policy: "Storage Policies", status: "Partially Compliant", percentage: 70 },
        { policy: "Usage and Deployment Policies", status: "Compliant", percentage: 85 },
        { policy: "Disposal Policies", status: "Non-Compliant", percentage: 60 },
      ],
      complianceOverview: [90, 70, 85, 60],
      labels: ["Procurement", "Storage", "Usage & Deployment", "Disposal", "Purchase"],
    };
    
    const valuationData = {
      categories: ["Specialized Equipment", "Operational Assets", "Government-Funded Items"],
      accuracy: [95, 80, 88],
    };
    
    const keyFindings = {
        category: "Storage Policies",
        finding: "Improper storage of arms",
        impact: "Risk of theft or misuse",
        recommendation: "Upgrade storage facilities and implement stricter access controls",
      }

    const report = {complianceData, valuationData, keyFindings}

  
    return NextResponse.json(report, { status: 201 });
  } catch (error) {
    console.error("Error creating request:", error);
    return NextResponse.json(
      { error: "Failed to create request" },
      { status: 500 },
    );
  }
}
