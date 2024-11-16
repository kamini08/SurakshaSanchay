import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
type EnumMaintenanceStatusFieldUpdateOperationsInput = 'COMPLETED' | 'DISCARDED';

// Submit Maintenance Request (POST)
export async function POST(request: Request) {
  try {
    const { userId, itemId, issueDescription } = await request.json();
    const newRequest = await prisma.maintenanceRequest.create({
      data: { userId, itemId, issueDescription },
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
    const requests = await prisma.maintenanceRequest.findMany();
    return NextResponse.json({ success: true, data: requests }, { status: 200 });
  } catch (error) {
    console.error('Error in GET /maintenance/request:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}


// Update a maintenance request (PUT)
export async function PUT(request: Request) {
  try {
    const { action, requestId, technicianId, resolutionDetails, isRepaired, discardReason } = await request.json();
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
        const status: EnumMaintenanceStatusFieldUpdateOperationsInput = isRepaired ? 'COMPLETED' : 'DISCARDED';
        const updateData = isRepaired
          ? { status, resolutionDetails, completionDate: new Date() }
          : { status, resolutionDetails, discardReason: 'Irreparable', completionDate: new Date() };

        updatedRequest = await prisma.maintenanceRequest.update({
          where: { id: requestId },
          data: updateData,
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
