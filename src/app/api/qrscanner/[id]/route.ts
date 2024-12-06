
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { db } from '@/lib/db';
import { auth } from '../../../../../auth';

const prisma = new PrismaClient();
// interface RouteParams {
//   params: { id: string };}


export async function GET(req: Request) {
  const session = await auth();
const role= session?.user.role;

  const id  = await req.url.split('/').pop();
  if (!id) {
    return NextResponse.json(
      { message: 'Invalid request: ID is required' },
      { status: 400 }
    );
  }

  try {
    const item = await db.inventoryItem.findUnique({
      where: { itemId: id },
    });
   console.log(item);
   if(!item){
    return NextResponse.json(
      {
        success:false,
        message:"no data found"
      },
      {
        status:404
      },
    )
}
return NextResponse.json({item,role}, { status: 200 });
  } catch (error) {
    console.error('Error fetching item:', error);
    return NextResponse.json(
      { success: false , message: 'Internal server error'},
      { status: 500 }
    );
  }
}
