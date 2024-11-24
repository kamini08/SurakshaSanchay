import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
type EnumMaintenanceStatusFieldUpdateOperationsInput = 'COMPLETED' | 'DISCARDED';

export async function POST(request:any) {
  try {
    const { userId, itemId, issueDescription } = await request.json();

    // Validate input
    if (!userId || !itemId || !issueDescription) {
      return NextResponse.json(
        { success: false, message: 'userId, itemId, and issueDescription are required.' },
        { status: 400 }
      );
    }

    // Check if the related InventoryItem exists
    const existingItem = await prisma.inventoryItem.findUnique({
      where: { itemId },
    });

    if (!existingItem) {
      return NextResponse.json(
        { success: false, message: `InventoryItem with itemId '${itemId}' does not exist.` },
        { status: 404 }
      );
    }

    // Create the maintenance request and link it to the existing InventoryItem
    const newRequest = await prisma.maintenanceRequest.create({
      data: {
        issueDescription,
        user: {
          connect: { govId: userId }, // Connect to the existing User
        },
        item: {
          connect: { itemId }, // Connect to the existing InventoryItem
        },
      },
    });

    return NextResponse.json({ success: true, data: newRequest }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /maintenance/request:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

// Get all maintenance requests (GET)
export async function GET() {
  try {
    const requests = await prisma.maintenanceRequest.findMany({
      include: {
        user: { select: { govId: true, name: true } },
        item: { select: {  category: true, type: true } },
      },
    });
    return NextResponse.json({ success: true, data: requests }, { status: 200 });
  } catch (error) {
    console.error('Error in GET /maintenance/request:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}


// Update a maintenance request (PUT)
export async function PUT(request: Request) {
  try {
    const { action, requestId, technicianId, resolutionDetails, discardReason,maintenanceCharge } = await request.json();
    let updatedRequest;

    switch (action) {
      case 'approve':
        updatedRequest = await prisma.maintenanceRequest.update({
          where: { id: requestId },
          data: { status: 'APPROVED', technicianId, approvalDate: new Date() },
        });
        break;
      case 'reject':
        updatedRequest = await prisma.maintenanceRequest.update({
          where: { id: requestId },
          data: { status: 'REJECTED', discardReason },
        });
        break;
        case 'complete':
          updatedRequest=await prisma.maintenanceRequest.update({
where: { id: requestId },
data: { status: 'COMPLETED', resolutionDetails, completionDate: new Date() ,maintenanceCharge },
          });
          break;
          case 'discard':
         updatedRequest=await prisma.maintenanceRequest.update({
           where:{id:requestId},
           data:{status:'DISCARDED',discardReason:discardReason,completionDate:new Date(),maintenanceCharge}
         });
         break;
      default:
        return NextResponse.json({ success: false, message: 'Invalid action type' }, { status: 400 });
    }
    return NextResponse.json({ success: true, data: updatedRequest }, { status: 200 });
  } catch (error) {
    console.error('Error in PUT /maintenance/request:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
