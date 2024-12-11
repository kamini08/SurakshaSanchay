import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Item {
  itemId: string;
  category: string;
  condition: string;
}

interface ResultDisplayProps {
  result: string;
  onClear: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onClear }) => {
  const [itemDetails, setItemDetails] = useState<Item | null>(null);
  const [pop, setPop] = useState(false);
  const [temporaryLocation, setTemporaryLocation] = useState("");
  const [isDamaged, setIsDamaged] = useState(false);
  const [userRole, setUserRole] = useState<"user" | "incharge" | null>(null);
  const [isUpdated, setIsUpdated] = useState(false); // New state variable

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const res = await fetch(`/api/qrscanner/${result}`);
        if (res.ok) {
          const data = await res.json();
          console.log("Item details:", data);
          setItemDetails(data.item);
          setUserRole(data.role);
        } else {
          console.error("Failed to fetch item details");
        }
      } catch (error) {
        console.error("Error fetching item:", error);
        toast.error("Error fetching item", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    };

    if (result) {
      fetchItemDetails();
    }
  }, [result]);

  const handleUpdate = async () => {
    const condition = isDamaged ? "Damaged" : "Good";
    try {
      const res = await fetch("/api/qrscanner/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId: result,
          condition,
          temporaryLocation,
        }),
      });

      if (res.ok) {
        console.log("Item updated successfully");
        toast.success("Item updated successfully", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        console.error("Failed to update item");
        toast.error("Failed to update item", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error updating item:", error);
      toast.error("Error updating item", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  if (!itemDetails) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="mx-auto mt-6 w-full max-w-md rounded-lg bg-white/20 p-6 text-black shadow-md outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
      <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">
        Scanned Item
      </h2>
      <p className="mb-4 text-xl text-gray-700 dark:text-white">
        The item under the Category{" "}
        <span className="font-semibold">{itemDetails.category}</span> and having
        ItemId <span className="font-semibold">{itemDetails.itemId}</span>
      </p>

      {!isUpdated && userRole === "incharge" ? (
        <div className="mb-4 text-xl">
          <label className="flex items-center">
            <span className="mr-2 text-gray-700 dark:text-white">
              Is Damaged?:
            </span>
            <input
              type="checkbox"
              checked={isDamaged}
              onChange={(e) => setIsDamaged(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500"
            />
          </label>
        </div>
      ) : userRole === "user" && !isUpdated ? (
        <div className="mb-4">
          <label className="mb-2 block text-xl text-gray-700">
            Is going to a Temporary Location:
            <input
              type="text"
              value={temporaryLocation}
              onChange={(e) => setTemporaryLocation(e.target.value)}
              className="focus:ring-blue -500 mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring"
              placeholder="Enter temporary location"
            />
          </label>
        </div>
      ) : null}

      <button
        onClick={handleUpdate}
        className="rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      >
        Update
      </button>
    </div>
  );
};

export default ResultDisplay;
