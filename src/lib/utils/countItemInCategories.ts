import { db } from "../db";

export async function countItemsInCategories() {
  try {
    const inventoryCount = await db.inventoryItem.groupBy({
        by: ["category"],
        _count: {
          _all: true,
        },
      });
    console.log("Item counts by category:", inventoryCount);
    return inventoryCount;
  } catch (error) {
    console.error("Error counting items in categories:", error);
    throw new Error("Failed to count items in categories.");
  }
}
