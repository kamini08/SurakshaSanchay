

import React, { useEffect, useState } from "react";

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
  const [temporaryLocation, setTemporaryLocation] = useState('');
  const [isDamaged, setIsDamaged] = useState(false);
  const [userRole, setUserRole] = useState<'user' | 'incharge' | null>(null);

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
      }
    };
    

    if (result) {
      fetchItemDetails();
    }

  }, [result]);

  const handleUpdate = async () => {
    const condition = isDamaged ? 'Damaged' : 'Good';
    try {
      const res = await fetch('/api/qrscanner/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemId: result,
          condition,
          temporaryLocation,
        }),
      });

      if (res.ok) {
        console.log('Item updated successfully');
      } else {
        console.error('Failed to update item');
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  if (!itemDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Scanned Item</h2>
      <p>The item under the Category {itemDetails.category} and having ItemId {itemDetails.itemId}</p>

      { userRole=== 'incharge' ? (
        <div>
          <label>
            is Damaged?:
            <input
              type="checkbox"
              checked={isDamaged}
              onChange={(e) => setIsDamaged(e.target.checked)}
            />
          </label>
        </div>
      ) : userRole === 'user' ? (
        <div>
          <label>
            is going to a Temporary Location:
            <input
              type="text"
              value={temporaryLocation}
              onChange={(e) => setTemporaryLocation(e.target.value)}
            />
          </label>
        </div>
      ) : null}

<button 
  onClick={handleUpdate} 
  className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
>
  Update
</button>
    </div>
  );
};

export default ResultDisplay;
