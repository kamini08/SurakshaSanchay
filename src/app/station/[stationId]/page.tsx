"use client";
import Loader from "@/components/common/Loader";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

const Station = () => {
  const [inventoryData, setInventoryData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();

  // Decode stationId from URL params
  const stationId = params?.stationId
    ? decodeURIComponent(params.stationId as string)
    : null;

  useEffect(() => {
    if (stationId) {
      const fetchInventoryData = async () => {
        try {
          // Fetch the data from the API endpoint
          const response = await fetch(`/api/station/${stationId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch inventory data");
          }
          const data = await response.json();
          console.log(data);
          setInventoryData(data); // Store the data in state
        } catch (err: any) {
          setError(err.message); // Handle any errors during the fetch
          console.error("Error fetching inventory data:", err);
        }
      };

      fetchInventoryData(); // Call the fetch function when stationId changes
    }
  }, [stationId]); // Re-run the effect whenever stationId changes

  // Function to exclude null values during JSON stringify
  const excludeNullValues = (obj: any) => {
    return JSON.stringify(
      obj,
      (key, value) => (value === null ? undefined : value),
      2,
    );
  };

  return (
    <div>
      <h1>Station: {stationId}</h1>
      {error && <div className="error">{error}</div>}

      <div>
        {inventoryData.length > 0 ? (
          inventoryData.map((item, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <h2>Item {index + 1}</h2>
              <pre>{excludeNullValues(item)}</pre>{" "}
              {/* Pretty-print the item and exclude nulls */}
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Station;
