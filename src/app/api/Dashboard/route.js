import { db } from "@/lib/db";

export async function GET() {
    try {
        const inventoryCount = await db.inventoryItem.groupBy({
            by: ['category'], // Ensure 'category' is correctly defined in your schema
            _count: {
                _all: true,
            },
        });
        // Format the response
        const result = inventoryCount.map(item => ({
            category: item.category,
            total: item._count._all,
            
        }));
        // Return the response
        return new Response(JSON.stringify({ data: result }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("Error fetching inventory count:", error);

        return new Response(JSON.stringify({ error: 'Failed to fetch inventory count' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
