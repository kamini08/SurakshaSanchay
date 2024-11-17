import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PATCH(request: Request) {
  try {
    // Parse the request body
    const { itemId, newCondition} = await request.json();

    // Validation
    if (!itemId || !newCondition) {
      return NextResponse.json(
        { error: 'All fields (itemId, newCondition) are required.' },
        { status: 400 }
      );
    }

    // Update the inventory item
    const updatedItem = await prisma.inventoryItem.update({
      where: { itemId },
      data: {
        condition: newCondition,
        lastInspectionDate:new Date(),
      },
    });

    // Respond with the updated item
    return NextResponse.json(updatedItem, { status: 200 });
  } catch (error: any) {
    console.error('Error updating inventory:', error.message);

    if (error.code === 'P2025') {
      // Prisma-specific error code for "Record not found"
      return NextResponse.json(
        { error: 'Inventory item not found.' },
        { status: 404 }
      );
    }

    // Generic error response
    return NextResponse.json(
      { error: 'An error occurred while updating the inventory.' },
      { status: 500 }
    );
  }
}

