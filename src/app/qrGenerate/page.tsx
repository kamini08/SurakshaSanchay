// 'use client'; // Required for client-side React components
// import React, { useState, useRef } from 'react';
// import QRCode from 'react-qr-code'; // Import QR code generator
// import 'tailwindcss/tailwind.css';
// import html2canvas from 'html2canvas'; // To convert the QR code to an image

// const GenerateQR: React.FC = () => {
//   const [itemId, setItemId] = useState('');
//   const [showQRCode, setShowQRCode] = useState(false);
//   const qrCodeRef = useRef<HTMLDivElement>(null);

//   const handleGenerateQR = () => {
//     if (itemId.trim() !== '') {
//       setShowQRCode(true);
//     }
//   };

//   // Function to download the QR code as an image
//   const downloadQRCode = async () => {
//     if (qrCodeRef.current) {
//       const canvas = await html2canvas(qrCodeRef.current);
//       const link = document.createElement('a');
//       link.href = canvas.toDataURL('image/png');
//       link.download = `${itemId}-qrcode.png`;
//       link.click();
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <h1 className="text-3xl font-bold mb-8">Generate QR Code</h1>
//       <input
//         type="text"
//         value={itemId}
//         onChange={(e) => setItemId(e.target.value)}
//         placeholder="Enter Item ID"
//         className="p-2 border border-gray-400 rounded w-64 mb-4"
//       />
//       <button
//         onClick={handleGenerateQR}
//         className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
//       >
//         Generate QR Code
//       </button>

//       {showQRCode && (
//         <div className="mt-6">
//           <h2 className="text-xl mb-2">QR Code for Item ID: {itemId}</h2>
//           <div ref={qrCodeRef} className="bg-white p-4">
//             <QRCode value={itemId} size={200} />
//           </div>
//           <button
//             onClick={downloadQRCode}
//             className="bg-green-500 text-white px-4 py-2 rounded mt-4"
//           >
//             Download QR Code
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GenerateQR;
"use client"; // Required for client-side rendering
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import GenerateQR from "./qr";

export default function Page() {
  return (
    <div className="mx-auto w-auto p-4 md:p-6 2xl:p-10">
      <Breadcrumb pageName="QR CODE GENERATOR" />
      <GenerateQR />
    </div>
  );
}
