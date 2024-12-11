import { db } from "@/lib/db";
import { auth } from "../../../../auth";

export async function GET(){
    const session = await auth();
  const user = session?.user;
  const output= await db.inventoryItem.findMany({
    where: {
      userId: user?.govId,
    },
  })
  return new Response(JSON.stringify(output), {
    headers: { "Content-Type": "application/json" },
  });
}