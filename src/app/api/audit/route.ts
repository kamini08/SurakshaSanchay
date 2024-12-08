// route.ts
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();
    const {
      itemId,
      assignedTo,
      assignedBy,
      assignDates,
      returnDates,
      inchargeIds,
      status, // Now a Json type
      reason, // Now a Json type
    } = body;

    // Validate input
    if (
      !itemId ||
      !assignedTo ||
      !assignedBy ||
      !assignDates ||
      !inchargeIds ||
      !status
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    // Check if a record with the same itemId exists
    const existingRecord = await prisma.itemAssignmentHistory.findFirst({
      where: { itemId },
    });

    if (existingRecord) {
      // Parse existing JSON fields
      const updatedAssignedTo = Array.isArray(existingRecord.assignedTo)
        ? [...existingRecord.assignedTo, ...assignedTo]
        : assignedTo;

      const updatedAssignedBy = Array.isArray(existingRecord.assignedBy)
        ? [...existingRecord.assignedBy, ...assignedBy]
        : assignedBy;

      const updatedAssignDates = Array.isArray(existingRecord.assignDates)
        ? [...existingRecord.assignDates, ...assignDates]
        : assignDates;

      const updatedReturnDates =
        returnDates.length > 0
          ? Array.isArray(existingRecord.returnDates)
            ? [...existingRecord.returnDates, ...returnDates]
            : returnDates
          : existingRecord.returnDates;

      const updatedInchargeIds = Array.isArray(existingRecord.inchargeIds)
        ? [...existingRecord.inchargeIds, ...inchargeIds]
        : inchargeIds;
      const updatedStatus = Array.isArray(existingRecord.itemStatus)
        ? [...existingRecord.itemStatus, ...status]
        : status;
      const updatedReason = Array.isArray(existingRecord.reason)
        ? [...existingRecord.reason, ...reason]
        : reason;

      // Update the existing record
      const updatedRecord = await prisma.itemAssignmentHistory.update({
        where: { id: existingRecord.id },
        data: {
          assignedTo: updatedAssignedTo,
          assignedBy: updatedAssignedBy,
          assignDates: updatedAssignDates,
          returnDates: updatedReturnDates,
          inchargeIds: updatedInchargeIds,
          itemStatus: updatedStatus, // Directly assign the Json value
          reason: updatedReason, // Directly assign the Json value
        },
      });

      return NextResponse.json({
        message: "ItemAssignmentHistory updated successfully",
        data: updatedRecord,
      });
    } else {
      // Create a new record if no existing record is found
      const newRecord = await prisma.itemAssignmentHistory.create({
        data: {
          itemId,
          assignedTo,
          assignedBy,
          assignDates,
          returnDates,
          inchargeIds,
          itemStatus: status, // Directly assign the Json value
          reason, // Directly assign the Json value
        },
      });

      return NextResponse.json({
        message: "ItemAssignmentHistory created successfully",
        data: newRecord,
      });
    }
  } catch (error: any) {
    console.error("Error creating/updating ItemAssignmentHistory:", error);

    return NextResponse.json(
      {
        message: "An error occurred while creating/updating the record",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
