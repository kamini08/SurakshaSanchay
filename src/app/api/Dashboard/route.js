import { db } from "@/lib/db";
import { auth } from "../../../../auth";

export async function GET() {
  try {
    const session = await auth();
    const userId = session.user.id;
    const role = session.user.role;

    // Fetch the user information including govId
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { location: true, govId: true }, // Select both location and govId
    });
    // console.log(user);

    // Check if the user exists
    if (!user) {
      return new Response(JSON.stringify({ error: "User  not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    let inventoryCount;

    if (role === "admin") {
      // Admin: Show all items in the inventory
      inventoryCount = await db.inventoryItem.groupBy({
        by: ["category"],
        _count: {
          _all: true,
        },
      });
    } else if (role === "incharge") {
      // Incharge: Show items based on user location
      const userLocation = user.location;

      inventoryCount = await db.inventoryItem.groupBy({
        where: { location: userLocation },
        by: ["category"],
        _count: {
          _all: true,
        },
      });
    } else if (role === "user") {
      // User: Show items related to their user ID
      inventoryCount = await db.inventoryItem.groupBy({
        where: { userId: user.govId }, // Assuming there's a userId field in inventoryItem
        by: ["category"],
        _count: {
          _all: true,
        },
      });
    } else {
      return new Response(JSON.stringify({ error: "Invalid user role" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Format the response
    const result = inventoryCount.map((item) => ({
      category: item.category,
      total: item._count._all,
    }));

    // console.log(result);

    // Return the response
    return new Response(JSON.stringify({ data: result }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching inventory count:", error);

    return new Response(
      JSON.stringify({ error: "Failed to fetch inventory count" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
