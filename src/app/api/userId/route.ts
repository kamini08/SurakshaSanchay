import { auth } from "../../../../auth";

export async function GET() {
  const session = await auth();
  const id = session?.user.id;
  return new Response(JSON.stringify(id), {
    headers: { "Content-Type": "application/json" },
  });
}