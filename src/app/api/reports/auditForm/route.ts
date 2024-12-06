import { AuditReport, Policy, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {

    const data = {
        auditOfficerName: "",
        auditOfficerId: "",
        location: "",
        startDate: "",
        endDate: "",
        policyName: "",
        findings: "",
        impact: "",
        recommendation: "",
        complianceStatus: "",
        compliancePercentage: "",
        specializedEquipment: "",
        operationalAssets: "",
        governmentFundedItems: "",
      };
    
    const body = await req.json(); // Parse request body

    console.log(body);
    const {
        auditDetails,
        policies,
        stockValuationAccuracy,
    } = body;

    // const user = await prisma.user.findUnique({
    //   where: { govId: userId },
    //   select: { role: true },
    // });

    const admin = await prisma.user.findFirst({
      where: { role: "admin" },
    });



    const Policiesid: any = [];
    const Policies: any = [];
        const spolicy: Policy = await prisma.policy.create({
            data: {
                name: "STORAGE_POLICY",
                findings: policies.storagePolicy.finding,
                impact: policies.storagePolicy.impact,
                recommendation: policies.storagePolicy.recommendation,
                complianceStatus: policies.storagePolicy.complianceStatus,
                compliancePercentage: policies.storagePolicy.compliancePercentage,
            }
        });
        const prpolicy: Policy = await prisma.policy.create({
            data: {
                name: "PROCUREMENT_POLICY",
                findings: policies.procurementPolicy.finding,
                impact: policies.procurementPolicy.impact,
                recommendation: policies.procurementPolicy.recommendation,
                complianceStatus: policies.procurementPolicy.complianceStatus,
                compliancePercentage: policies.procurementPolicy.compliancePercentage,
            }
        });
        const upolicy: Policy = await prisma.policy.create({
            data: {
                name: "USAGE_AND_DEPLOYMENT_POLICY",
                findings: policies.usageDeploymentPolicy.finding,
                impact: policies.usageDeploymentPolicy.impact,
                recommendation: policies.usageDeploymentPolicy.recommendation,
                complianceStatus: policies.usageDeploymentPolicy.complianceStatus,
                compliancePercentage: policies.usageDeploymentPolicy.compliancePercentage,
            }
        });
        const dpolicy: Policy = await prisma.policy.create({
            data: {
                name: "DISPOSAL_POLICY",
                findings: policies.disposalPolicy.finding,
                impact: policies.disposalPolicy.impact,
                recommendation: policies.disposalPolicy.recommendation,
                complianceStatus: policies.disposalPolicy.complianceStatus,
                compliancePercentage: policies.disposalPolicy.compliancePercentage,
            }
        });
        const ppolicy: Policy = await prisma.policy.create({
            data: {
                name: "PURCHASE_POLICY",
                findings: policies.purchasePolicy.finding,
                impact: policies.purchasePolicy.impact,
                recommendation: policies.purchasePolicy.recommendation,
                complianceStatus: policies.purchasePolicy.complianceStatus,
                compliancePercentage: policies.purchasePolicy.compliancePercentage,
            }
        });

        Policies.push(spolicy, prpolicy, upolicy, dpolicy, ppolicy)

        Policiesid.push(spolicy.id, prpolicy.id, upolicy.id, dpolicy.id, ppolicy.id);


        const StockAccuracy = await prisma.stock.create(
            {
                data: {
                    specializedEquipment: policies.stockValuationAccuracy.specializedEquipment,
                    operationalAssets: policies.stockValuationAccuracy.operationalAssets,
                    governmentFundedItems: policies.stockValuationAccuracy.governmentFundedItems,
                }}
        )



    // if (!user || user.role !== "incharge") {
    //   return NextResponse.json(
    //     { success: false, message: "Permission denied!" },
    //     { status: 403 },
    //   );
    // }
    const request = await prisma.auditReport.create({
      data: {
        auditOfficerName: auditDetails.auditOfficerName,
        auditOfficerId: auditDetails.auditOfficerId,
        location: auditDetails.location,
        startDate: auditDetails.startDate,
        endDate: auditDetails.endDate,
        Policies,
        Policiesid,
        StockAccuracy: stockValuationAccuracy,
        StockId: StockAccuracy.id,
        
      },
    });

    return NextResponse.json(request, { status: 201 });
  } catch (error) {
    console.error("Error submitting Audit Details:", error);
    return NextResponse.json(
      { error: "Failed to submit Audit Details" },
      { status: 500 },
    );
  }
}
