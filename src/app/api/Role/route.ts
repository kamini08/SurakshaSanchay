import { auth } from "../../../../auth";

export async function GET() {
  const session = await auth();
  const role = session?.user.role;
  return new Response(JSON.stringify(role), {
    headers: { "Content-Type": "application/json" },
  });
}