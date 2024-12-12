"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Item {
  itemId: string;
  govId: string;
  location: string;
  status: string;
  description: string;
}

const ItemList = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/asset/assetItem");
        if (!response.ok) {
          throw new Error("Failed to fetch items");
          toast.error("something went wrong", {
            position: "top-right",
            autoClose: 3000,
          });
        }

        const data = await response.json();
        setItems(data);
      } catch (error: any) {
        setError(error.message);
        toast.error("something went wrong", {
          position: "top-right",
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="p-6">
      <h2 className="mb-4 text-xl font-semibold">Asset Tracking</h2>
      {loading && <p>Loading items...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border-b p-3">Item ID</th>
            <th className="border-b p-3">Gov ID</th>
            <th className="border-b p-3">Location</th>
            <th className="border-b p-3">Status</th>
            <th className="border-b p-3">Description</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {items.length > 0 ? (
            items.map((item) => (
              <tr key={item.itemId}>
                <td className="border-b p-3">{item.itemId}</td>
                <td className="border-b p-3">{item.govId}</td>
                <td className="border-b p-3">{item.location}</td>
                <td className="border-b p-3">{item.status}</td>
                <td className="border-b p-3">{item.description}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="p-3 text-center">
                No items available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ItemList;
