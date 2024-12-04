
// 'use client';
// import React, { useEffect, useRef, useState } from 'react';
// import { Html5Qrcode } from 'html5-qrcode';

// const QRScanner: React.FC = () => {
//   const qrCodeRegionId = 'qr-code-region'; // ID of the region where the QR code scanner will render
//   const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
//   const [decodedText, setDecodedText] = useState<string>(''); // To store the scanned QR code text from the camera.
//   const [fileDecodedText, setFileDecodedText] = useState<string>(''); // To store QR code text from file.
//   const [isScanning, setIsScanning] = useState<boolean>(false); // To track whether the scanner is active.
//   const [scanError, setScanError] = useState<string>(''); // To display error messages to users

//   // Handle QR code scanning from the camera
//   useEffect(() => {
//     if (isScanning) {
//       const qrRegionElement = document.getElementById(qrCodeRegionId);
//       if (qrRegionElement) {
//         const html5QrCode = new Html5Qrcode(qrCodeRegionId);
//         html5QrCodeRef.current = html5QrCode;

//         const startScanner = async () => {
//           try {
//             await html5QrCode.start(
//               { facingMode: 'environment' }, // Use rear camera
//               { fps: 10, qrbox: 250 }, // Scanner configuration
//               (text) => {
//                 console.log(`Decoded text from camera: ${text}`);
//                 setDecodedText(text); // Update state with the scanned text.
//                 html5QrCode.stop(); // Stop scanner after a successful scan.
//                 setIsScanning(false); // Update scanning state
//               },
//               (errorMessage) => {
//                 console.error(`Error scanning QR code: ${errorMessage}`);
//                 // Enhanced error handling: If error is related to QR code not being found, retry
//                 if (errorMessage.includes('NotFoundException')) {
//                   setScanError('QR code not found or unreadable. Please adjust the camera position or try another QR code.');
//                 } else {
//                   setScanError('An error occurred while scanning the QR code.');
//                 }
//                 setIsScanning(false); // Reset scanning state on error
//               }
//             );
//           } catch (err) {
//             console.error('Failed to start QR scanner', err);
//             setScanError('Failed to start QR scanner. Please try again later.');
//             setIsScanning(false); // Reset scanning state on error
//           }
//         };

//         startScanner();
//       }
//     }

//     return () => {
//       if (html5QrCodeRef.current) {
//         html5QrCodeRef.current.stop().then(() => html5QrCodeRef.current?.clear());
//       }
//     };
//   }, [isScanning]);

//   // Handle file input for QR code
//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
//       const reader = new FileReader();
//       reader.onload = async (e) => {
//         const imgElement = new Image();
//         imgElement.src = e.target?.result as string;

//         imgElement.onload = async () => {
//           try {
//             // Convert the image to a URL and decode from that URL
//             const html5QrCode = new Html5Qrcode('dummy-qr-region'); // This can be a random string or null
//             const result = await html5QrCode.decodeFromImageUrl(imgElement.src); // Decode QR code from the image URL
//             console.log(`Decoded text from file: ${result}`);
//             setFileDecodedText(result); // Set decoded text from the file
//           } catch (error) {
//             console.error('Error decoding QR from file', error);
//             setFileDecodedText('Error decoding QR from file'); // Display an error message
//           }
//         };

//         imgElement.onerror = () => {
//           console.error('Error loading the image');
//           setFileDecodedText('Error loading the image');
//         };
//       };
//       reader.readAsDataURL(file);
//     } else {
//       console.error('Invalid file type');
//       setFileDecodedText('Invalid file type. Please upload a PNG or JPEG.');
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-3xl font-semibold text-center mb-6">QR Scanner</h1>

//       {/* Camera Scanner */}
//       <div className="mb-6">
//         {!isScanning ? (
//           <button
//             onClick={() => setIsScanning(true)}
//             className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
//           >
//             Start Camera Scan
//           </button>
//         ) : (
//           <div
//             id={qrCodeRegionId}
//             className="w-full h-72 border-2 border-gray-300 mt-4"
//           ></div>
//         )}
//       </div>

//       {/* Display any scanning errors */}
//       {scanError && (
//         <div className="mt-4 text-lg font-bold text-center text-red-500">
//           {scanError}
//         </div>
//       )}

//       {/* File Upload */}
//       <div>
//         <input
//           type="file"
//           accept="image/png, image/jpeg"
//           onChange={handleFileUpload}
//           className="file:py-2 file:px-4 file:rounded-lg file:border-2 file:border-gray-300 file:bg-gray-50 mt-4"
//         />
//         {fileDecodedText && (
//           <div className="mt-4 text-lg font-bold text-center text-gray-700">
//             File Scanned Text: {fileDecodedText}
//           </div>
//         )}
//       </div>

//       {/* Display Decoded Text from Camera */}
//       {decodedText && (
//         <div className="mt-4 text-lg font-bold text-center text-gray-700">
//           Scanned Text: {decodedText}
//         </div>
//       )}
//     </div>
//   );
// };

// export default QRScanner;


















// 'use client';
// import React, { useState } from 'react';
// import jsQR from 'jsqr';

// const QRScanner: React.FC = () => {
//   const [decodedText, setDecodedText] = useState<string>(''); // To store the scanned QR code text from the camera.
//   const [fileDecodedText, setFileDecodedText] = useState<string>(''); // To store QR code text from file.
//   const [scanError, setScanError] = useState<string>(''); // To display error messages to users

//   // Handle file input for QR code
//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const imgElement = new Image();
//         imgElement.src = e.target?.result as string;

//         imgElement.onload = () => {
//           try {
//             // Create a canvas to draw the image
//             const canvas = document.createElement('canvas');
//             const ctx = canvas.getContext('2d');
//             if (ctx) {
//               // Set canvas dimensions to match the image
//               canvas.width = imgElement.width;
//               canvas.height = imgElement.height;

//               // Draw the image onto the canvas
//               ctx.drawImage(imgElement, 0, 0, imgElement.width, imgElement.height);

//               // Get image data and decode the QR code
//               const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//               const code = jsQR(imageData.data, imageData.width, imageData.height);

//               if (code) {
//                 console.log(`Decoded text from file: ${code.data}`);
//                 setFileDecodedText(code.data); // Set decoded text from the file
//               } else {
//                 setFileDecodedText('No QR code found in the image');
//               }
//             }
//           } catch (error) {
//             console.error('Error decoding QR from file', error);
//             setFileDecodedText('Error decoding QR from file'); // Display an error message
//           }
//         };

//         imgElement.onerror = () => {
//           console.error('Error loading the image');
//           setFileDecodedText('Error loading the image');
//         };
//       };
//       reader.readAsDataURL(file);
//     } else {
//       console.error('Invalid file type');
//       setFileDecodedText('Invalid file type. Please upload a PNG or JPEG.');
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-3xl font-semibold text-center mb-6">QR Scanner</h1>

//       {/* File Upload */}
//       <div>
//         <input
//           type="file"
//           accept="image/png, image/jpeg"
//           onChange={handleFileUpload}
//           className="file:py-2 file:px-4 file:rounded-lg file:border-2 file:border-gray-300 file:bg-gray-50 mt-4"
//         />
//         {fileDecodedText && (
//           <div className="mt-4 text-lg font-bold text-center text-gray-700">
//             File Scanned Text: {fileDecodedText}
//           </div>
//         )}
//       </div>

//       {/* Display any scanning errors */}
//       {scanError && (
//         <div className="mt-4 text-lg font-bold text-center text-red-500">
//           {scanError}
//         </div>
//       )}

//       {/* Display Decoded Text from Camera */}
//       {decodedText && (
//         <div className="mt-4 text-lg font-bold text-center text-gray-700">
//           Scanned Text: {decodedText}
//         </div>
//       )}
//     </div>
//   );
// };

// export default QRScanner;






'use client';
import React, { useState } from 'react';
import jsQR from 'jsqr';

interface InventoryItem {
  itemId: string;
  category: string;
  type?: string;
  description?: string;
  quantity: number;
  location?: string;
  condition?: string;
  acquisitionDate?: string;
  expiryDate?: string;
  price?: number;
  supplier?: string;
  returnDate?: string;
  lastInspectionDate?: string;
  maintenanceSchedule?: string;
  maintenanceCharge?: number;
  issuedTo?: string;
}

const QRScanner: React.FC = () => {
  const [decodedText, setDecodedText] = useState<string>(''); // Decoded QR code text
  const [fileDecodedText, setFileDecodedText] = useState<string>(''); // Decoded text from file
  const [scanError, setScanError] = useState<string>(''); // To display error messages
  const [itemDetails, setItemDetails] = useState<InventoryItem | null>(null); // Store fetched item details

  // Fetch item details from backend
  const fetchItemDetails = async (itemId: string) => {
    try {
      const response = await fetch(`/api/qrscanner/${itemId}`);
      
      if (!response.ok) {
        throw new Error(`Error fetching item details: ${response.statusText}`);
      }
      const data: InventoryItem = await response.json();
      setItemDetails(data); // Update state with item details
    } catch (error) {
      console.error('Error fetching item details:', error);
      setScanError('Failed to fetch item details. Please try again.');
    }
  };

  // Handle file input for QR code
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imgElement = new Image();
        imgElement.src = e.target?.result as string;

        imgElement.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (ctx) {
              canvas.width = imgElement.width;
              canvas.height = imgElement.height;
              ctx.drawImage(imgElement, 0, 0, imgElement.width, imgElement.height);
              const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
              const code = jsQR(imageData.data, imageData.width, imageData.height);

              if (code) {
                setFileDecodedText(code.data); // Set decoded text from file
                setDecodedText(code.data); // Set decoded text for display
                fetchItemDetails(code.data); // Fetch item details from backend
              } else {
                setFileDecodedText('No QR code found in the image');
              }
            }
          } catch (error) {
            console.error('Error decoding QR from file', error);
            setFileDecodedText('Error decoding QR from file');
          }
        };

        imgElement.onerror = () => {
          console.error('Error loading the image');
          setFileDecodedText('Error loading the image');
        };
      };
      reader.readAsDataURL(file);
    } else {
      setFileDecodedText('Invalid file type. Please upload a PNG or JPEG.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold text-center mb-6">QR Scanner</h1>

      {/* File Upload */}
      <div>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFileUpload}
          className="file:py-2 file:px-4 file:rounded-lg file:border-2 file:border-gray-300 file:bg-gray-50 mt-4"
        />
        {fileDecodedText && (
          <div className="mt-4 text-lg font-bold text-center text-gray-700">
            File Scanned Text: {fileDecodedText}
          </div>
        )}
      </div>

      {/* Display any scanning errors */}
      {scanError && (
        <div className="mt-4 text-lg font-bold text-center text-red-500">
          {scanError}
        </div>
      )}

      {/* Display Item Details */}
      {itemDetails && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Item Details</h2>
          <ul className="text-lg">
            <li><strong>Item ID:</strong> {itemDetails.itemId}</li>
            <li><strong>Category:</strong> {itemDetails.category}</li>
            <li><strong>Type:</strong> {itemDetails.type || 'N/A'}</li>
            <li><strong>Description:</strong> {itemDetails.description || 'N/A'}</li>
            <li><strong>Quantity:</strong> {itemDetails.quantity}</li>
            <li><strong>Location:</strong> {itemDetails.location || 'N/A'}</li>
            <li><strong>Condition:</strong> {itemDetails.condition || 'N/A'}</li>
            <li><strong>Acquisition Date:</strong> {itemDetails.acquisitionDate || 'N/A'}</li>
            <li><strong>Expiry Date:</strong> {itemDetails.expiryDate || 'N/A'}</li>
            <li><strong>Price:</strong> {itemDetails.price || 'N/A'}</li>
            <li><strong>Supplier:</strong> {itemDetails.supplier || 'N/A'}</li>
            <li><strong>Return Date:</strong> {itemDetails.returnDate || 'N/A'}</li>
            <li><strong>Last Inspection Date:</strong> {itemDetails.lastInspectionDate || 'N/A'}</li>
            <li><strong>Maintenance Schedule:</strong> {itemDetails.maintenanceSchedule || 'N/A'}</li>
            <li><strong>Maintenance Charge:</strong> {itemDetails.maintenanceCharge || 'N/A'}</li>
            <li><strong>Issued To:</strong> {itemDetails.issuedTo || 'N/A'}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default QRScanner;
