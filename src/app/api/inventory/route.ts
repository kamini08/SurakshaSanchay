import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth } from '../../../../auth';
import { db } from '@/lib/db';
// import { db } from '@/lib/db';

const prisma = new PrismaClient();

async function deleteInventoryItem(userId: string, itemId: string) {
  const user = await prisma.user.findUnique({
    where: {id: userId },
    select: { role: true },
  });

  if (!user || user.role !== 'admin') {
    return { success: false, message: 'Permission denied: Only admins can delete inventory items.' };
  }


  await prisma.inventoryItem.delete({
    where: { itemId: itemId },
  });

  return { success: true, message: 'Inventory item deleted successfully.' };
}

// Function to add an inventory item (only for admins)
async function addInventoryItem(userId: string, itemData: any,categorySpecificData: any) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  if (!user || user.role !== 'admin') {
    return { success: false, message: 'Permission denied: Only admins can add inventory items.' };
  }

 
 // Create the inventory item
 const newItem = await prisma.inventoryItem.create({
  data: {
    itemId: itemData.itemId,
    category: itemData.category, 
    type: itemData.type || null,
    description: itemData.description || null,
    quantity: itemData.quantity || 1,
    location: itemData.location || null,
    condition: itemData.condition || 'new',
    acquisitionDate: itemData.acquisitionDate ? new Date(itemData.acquisitionDate) : null,
    expiryDate: itemData.expiryDate ? new Date(itemData.expiryDate) : null,
    price: itemData.price || null,
    supplier: itemData.supplier || null,
    returnDate: itemData.returnDate || null,
    lastInspectionDate: itemData.lastInspectionDate
      ? new Date(itemData.lastInspectionDate)
      : null,
    maintenanceSchedule: itemData.maintenanceSchedule || null,
    maintenanceCharge: itemData.maintenanceCharge || null,
    issuedTo: itemData.issuedTo || null,
    userId: userId || null,
  },
});

console.log("hello");

// Insert into category-specific table
let categoryResponse;
switch (itemData.category) {
  case 'COMMUNICATION_DEVICES':
    categoryResponse = await prisma.communicationDevice.create({
      data: {
        inventoryItemId: newItem.itemId,
        frequencyRange: categorySpecificData.frequencyRange || null,
        batteryType: categorySpecificData.batteryType || null,
        connectivity: categorySpecificData.connectivity || null,
      },
    });
    break;

  case 'COMPUTER_AND_IT_EQUIPMENT':
    categoryResponse = await prisma.computerAndITEquipment.create({
      data: {
        inventoryItemId: newItem.itemId,
        processor: categorySpecificData.processor || null,
        RAM: categorySpecificData.ram || null,
        storage: categorySpecificData.storage || null,
        OS: categorySpecificData.os || null,
      },
    });
    break;
    default:
      return NextResponse.json(
        { success: false, message: 'Invalid category or unsupported category.' },
        { status: 400 }
      );
  }
  return { success: true, message: 'Inventory item added successfully.', data: newItem };
}
// POST handler
export async function POST(req: Request) {
  try {
    const session = await auth(); // Fetch session server-side
    const userId = session?.user.id || null;
    // const userId="cm3kg2lk50000mbsh62xi263w";
    const body = await req.json();

    if (!body || !body.itemData || !body.categorySpecificData) {
      return NextResponse.json(
        { success: false, message: "itemData and categorySpecificData are required." },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Authentication failed. User ID is missing." },
        { status: 401 }
      );
    }

    const { itemData, categorySpecificData } = body;

    const response = await addInventoryItem(userId, itemData, categorySpecificData);

    if ((response as any).success) {
      return NextResponse.json(response, { status: 201 });
    } else {
      return NextResponse.json(response, { status: 400 });
    }
  } catch (error: any) {
    // Handle any unexpected errors
    return NextResponse.json(
      { success: false, message: `Internal server error: ${error.message}` },
      { status: 500 }
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
        { success: false, message: 'userId and itemId are required.' },
        { status: 400 }
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
   
      { status: 500 }
    );
  }
}


export async function PUT(req:Request) {
  try {
    const session = await auth(); // Fetch session server-side
    const userId = session?.user.id;
    const body = await req.json();
    const { itemId, fieldsToUpdate, childUpdates } = body;
    const user = await prisma.user.findUnique({
          where: { id: userId },
          select: { role: true },
        });
      
        if (!user || user.role !== 'admin') {
          return NextResponse.json({ success: false, message: 'Permission denied: Only admins can update inventory items.' });
        }
        
    if (!itemId || !fieldsToUpdate) {
      return new Response(
        JSON.stringify({ error: 'itemId and fieldsToUpdate are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
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
      JSON.stringify({ message: 'Item and related data updated successfully', updatedItem }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error:any) {
    console.error('Error updating inventory item and related data:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to update inventory item and related data',
        details: error.message,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function GET() {
  try {
    // Fetch data from the addInventory table
    const inventoryData = await db.inventoryItem.findMany();
    
    // Return the data as a JSON response
    return NextResponse.json(inventoryData);
  } catch (error) {
    console.error("Error fetching inventory data: ", error);
    return NextResponse.json({ error: 'Failed to fetch inventory data' }, { status: 500 });
  }
}