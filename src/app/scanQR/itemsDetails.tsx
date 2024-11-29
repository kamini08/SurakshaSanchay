
// 'use client';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';

// const ItemDetails = () => {
//   const router = useRouter();
//   const { itemId } = router.query; // Get itemId from URL
//   const [itemDetails, setItemDetails] = useState<any>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     if (itemId) {
//       // Fetch the item details from the API using the itemId
//       fetchItemDetails(itemId as string);
//     }
//   }, [itemId]);

//   const fetchItemDetails = async (id: string) => {
//     try {
//       const response = await fetch(`/api/getItemDetails?id=${id}`);
//       const data = await response.json();
//       setItemDetails(data);
//     } catch (error) {
//       console.error('Error fetching item details:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <div className="text-center">Loading item details...</div>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4">Item Details</h1>
//       {itemDetails ? (
//         <div>
//           <p><strong>Item ID:</strong> {itemDetails.itemId}</p>
//           <p><strong>Category:</strong> {itemDetails.category}</p>
//           <p><strong>Description:</strong> {itemDetails.description}</p>
//           <p><strong>Quantity:</strong> {itemDetails.quantity}</p>
//         </div>
//       ) : (
//         <p>Item not found.</p>
//       )}
//     </div>
//   );
// };

// export default ItemDetails;
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const ItemDetails = () => {
  const router = useRouter();
  const { itemId } = router.query; // Get itemId from URL
  const [itemDetails, setItemDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (itemId) {
      // Fetch the item details from the API using the itemId
      fetchItemDetails(itemId as string);
    } else {
      setError("No item ID found in URL.");
    }
  }, [itemId]);

  const fetchItemDetails = async (id: string) => {
    try {
      const response = await fetch(`/api/getItemDetails?id=${id}`);
      
      // Check for valid response status
      if (!response.ok) {
        throw new Error("Error fetching item details.");
      }

      const data = await response.json();

      // Ensure the data is valid JSON
      if (data && typeof data === 'object') {
        setItemDetails(data);
      } else {
        setError("Invalid item details data.");
      }
    } catch (error) {
      console.error('Error fetching item details:', error);
      setError("Failed to fetch item details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center">Loading item details...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Item Details</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        itemDetails ? (
          <div>
            <p><strong>Item ID:</strong> {itemDetails.itemId}</p>
            <p><strong>Category:</strong> {itemDetails.category}</p>
            <p><strong>Description:</strong> {itemDetails.description}</p>
            <p><strong>Quantity:</strong> {itemDetails.quantity}</p>
          </div>
        ) : (
          <p>Item not found.</p>
        )
      )}
    </div>
  );
};

export default ItemDetails;
