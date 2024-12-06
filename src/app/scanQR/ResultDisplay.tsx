// import React from 'react';
// import { QrCode, X, Copy, Check } from 'lucide-react';

// interface ResultDisplayProps {
//   result: string;
//   onClear: () => void;
// }

// const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onClear }) => {
//   const [copied, setCopied] = React.useState(false);

//   const handleCopy = async () => {
//     await navigator.clipboard.writeText(result);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto mt-6">
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center">
//           <QrCode className="w-6 h-6 text-blue-500 mr-2" />
//           <h2 className="text-xl font-semibold">Scanned Result</h2>
//         </div>
//         <div className="flex gap-2">
//           <button
//             onClick={handleCopy}
//             className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-md hover:bg-gray-100"
//             aria-label="Copy result"
//           >
//             {copied ? (
//               <Check className="w-5 h-5 text-green-500" />
//             ) : (
//               <Copy className="w-5 h-5" />
//             )}
//           </button>
//           <button
//             onClick={onClear}
//             className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-md hover:bg-gray-100"
//             aria-label="Clear result"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>
//       </div>
//       <div className="bg-gray-50 p-4 rounded-md">
//         <p className="text-gray-800 break-all">{result}</p>
//       </div>
//     </div>
//   );
// };










// export default ResultDisplay;
// import React from 'react';
// import { QrCode, X, Copy, Check } from 'lucide-react';

// interface ResultDisplayProps {
//   result: string;
//   onClear: () => void;
// }

// const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onClear }) => {
//   const [copied, setCopied] = React.useState(false);

//   const handleCopy = async () => {
//     await navigator.clipboard.writeText(result);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <div className="bg-white dark:bg-boxdark p-6 rounded-lg shadow-md w-full max-w-md mx-auto mt-6 text-black dark:text-white">
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center">
//           <QrCode className="w-6 h-6 text-blue-500 dark:text-blue-400 mr-2" />
//           <h2 className="text-xl font-semibold">Scanned Result</h2>
//         </div>
//         <div className="flex gap-2">
//           <button
//             onClick={handleCopy}
//             className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors p-1 rounded-md hover:bg-gray-100 dark:hover:bg-strokedark"
//             aria-label="Copy result"
//           >
//             {copied ? (
//               <Check className="w-5 h-5 text-green-500 dark:text-green-400" />
//             ) : (
//               <Copy className="w-5 h-5" />
//             )}
//           </button>
//           <button
//             onClick={onClear}
//             className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors p-1 rounded-md hover:bg-gray-100 dark:hover:bg-strokedark"
//             aria-label="Clear result"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>
//       </div>
//       <div className="bg-gray-50 dark:bg-strokedark p-4 rounded-md">
//         <p className="text-gray-800 dark:text-gray-200 break-all">{result}</p>
//       </div>
//     </div>
//   );
// };

// export default ResultDisplay;






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

      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default ResultDisplay;
