// 'use client';
// import React, { useState } from 'react';
// import QRCodeScanner from '../QrScanner/page'; // Adjust path based on your structure
// import { useRouter } from 'next/router';
// import jsQR from 'jsqr'; // Ensure jsqr is installed

// const ScanPage = () => {
//   const router = useRouter();
//   const [scanResult, setScanResult] = useState<string | null>(null);
//   const [file, setFile] = useState<File | null>(null);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   const handleScanSuccess = (decodedText: string) => {
//     setScanResult(decodedText);
//     router.push(`/scanQR/itemsDetail?id=${decodedText}`);
//   };

//   // For file upload and QR scan
//   const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setFile(file);
//       const reader = new FileReader();
//       reader.onload = async (e) => {
//         const imageData = e.target?.result;
//         if (typeof imageData === 'string') {
//           const image = new Image();
//           image.src = imageData;
//           image.onload = () => {
//             const canvas = document.createElement('canvas');
//             canvas.width = image.width;
//             canvas.height = image.height;
//             const ctx = canvas.getContext('2d');
//             if (ctx) {
//               ctx.drawImage(image, 0, 0);
//               const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//               const qrCode = jsQR(imageData.data, canvas.width, canvas.height);
//               if (qrCode) {
//                 handleScanSuccess(qrCode.data);
//               } else {
//                 setErrorMessage('Unable to scan the QR code from the image.');
//               }
//             }
//           };
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 text-center">
//       <h1 className="text-3xl font-bold mb-4">Scan QR Code</h1>
//       <div className="flex justify-center space-x-4 mb-4">
//         <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
//           Scan with Camera
//         </button>
//         <div>
//           <label className="text-blue-500 hover:text-blue-700 cursor-pointer">
//             Upload QR Image
//             <input
//               type="file"
//               className="hidden"
//               accept="image/*"
//               onChange={handleFileChange}
//             />
//           </label>
//         </div>
//       </div>
//       {errorMessage && <p className="text-red-500">{errorMessage}</p>}
//       {scanResult && <p className="text-green-500">Scan complete! Redirecting...</p>}
//     </div>
//   );
// };

// export default ScanPage;
