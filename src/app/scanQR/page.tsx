// 'use client';
// import React, { useEffect, useRef } from "react";
// import { Html5QrcodeScanner } from "html5-qrcode";

// interface QRCodeScannerProps {
//   onScanSuccess: (decodedText: string) => void;
//   onScanError?: (error: string) => void;
// }

// const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ onScanSuccess, onScanError }) => {
//   const scannerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const html5QrCodeScanner = new Html5QrcodeScanner(
//       scannerRef.current!.id, 
//       {
//         fps: 10, // frames per second
//         qrbox: { width: 250, height: 250 },
//       },
//       false
//     );

//     html5QrCodeScanner.render(
//       (decodedText) => {
//         onScanSuccess(decodedText);
//       },
//       (error) => {
//         if (onScanError) {
//           onScanError(error);
//         }
//       }
//     );

//     // Clean up the scanner when the component unmounts
//     return () => {
//       html5QrCodeScanner.clear();
//     };
//   }, [onScanSuccess, onScanError]);

//   return (
//     <div className="flex justify-center items-center">
//       <div id="reader" ref={scannerRef}></div>
//     </div>
//   );
// };

// export default QRCodeScanner;
// import React, { useEffect, useRef } from "react";
// import { Html5QrcodeScanner } from "html5-qrcode";

// interface QRCodeScannerProps {
//   onScanSuccess: (decodedText: string) => void;
//   onScanError?: (error: string) => void;
// }

// const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ onScanSuccess, onScanError }) => {
//   const scannerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const html5QrCodeScanner = new Html5QrcodeScanner(
//       scannerRef.current!.id, 
//       {
//         fps: 10, // frames per second
//         qrbox: { width: 250, height: 250 },
//       },
//       false
//     );

//     html5QrCodeScanner.render(
//       (decodedText) => {
//         onScanSuccess(decodedText);
//       },
//       (error) => {
//         if (onScanError) {
//           onScanError(error);
//         }
//       }
//     );

//     // Clean up the scanner when the component unmounts
//     return () => {
//       html5QrCodeScanner.clear();
//     };
//   }, [onScanSuccess, onScanError]);

//   return (
//     <div className="flex justify-center items-center">
//       <div id="reader" ref={scannerRef}></div>
//     </div>
//   );
// };

// export default QRCodeScanner;

// 'use client';

// import React, { useEffect, useRef, useState } from 'react';
// import { Html5QrcodeScanner } from 'html5-qrcode';
// import jsQR from 'jsqr';

// interface QRCodeScannerProps {
//   onScanSuccess: (decodedText: string) => void;
//   onScanError?: (error: string) => void;
// }

// const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ onScanSuccess, onScanError }) => {
//   const scannerRef = useRef<HTMLDivElement>(null);
//   const [isCameraActive, setIsCameraActive] = useState(true);

//   useEffect(() => {
//     if (isCameraActive) {
//       const html5QrCodeScanner = new Html5QrcodeScanner(
//         scannerRef.current!.id,
//         {
//           fps: 10, // frames per second
//           qrbox: { width: 250, height: 250 },
//         },
//         false
//       );

//       html5QrCodeScanner.render(
//         (decodedText) => {
//           onScanSuccess(decodedText);
//         },
//         (error) => {
//           if (onScanError) {
//             onScanError(error);
//           }
//         }
//       );

//       // Clean up the scanner when the component unmounts
//       return () => {
//         html5QrCodeScanner.clear();
//       };
//     }
//   }, [isCameraActive, onScanSuccess, onScanError]);

//   // Function to handle image file uploads
//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const img = new Image();
//         img.src = e.target?.result as string;
//         img.onload = () => {
//           const canvas = document.createElement('canvas');
//           canvas.width = img.width;
//           canvas.height = img.height;
//           const ctx = canvas.getContext('2d');
//           ctx?.drawImage(img, 0, 0, img.width, img.height);
//           const imageData = ctx?.getImageData(0, 0, img.width, img.height);
//           if (imageData) {
//             const code = jsQR(imageData.data, imageData.width, imageData.height);
//             if (code) {
//               onScanSuccess(code.data);
//             } else {
//               onScanError?.('QR code not detected in the uploaded image.');
//             }
//           }
//         };
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="flex flex-col justify-center items-center">
//       {/* Toggle between camera scanner and file upload */}
//       <div className="flex justify-around w-full mb-4">
//         <button
//           className={`btn ${isCameraActive ? 'btn-active' : ''}`}
//           onClick={() => setIsCameraActive(true)}
//         >
//           Scan with Camera
//         </button>
//         <button
//           className={`btn ${!isCameraActive ? 'btn-active' : ''}`}
//           onClick={() => setIsCameraActive(false)}
//         >
//           Upload QR Image
//         </button>
//       </div>

//       {isCameraActive ? (
//         <div id="reader" ref={scannerRef}></div>
//       ) : (
//         <input type="file" accept="image/*" onChange={handleFileUpload} />
//       )}
//     </div>
//   );
// };

// export default QRCodeScanner;
'use client'; // Ensures the component runs on the client side

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router'; // Import useRouter for navigation
import jsQR from 'jsqr'; // For QR code decoding
import { Html5QrcodeScanner } from 'html5-qrcode'; // For camera scanning

const ScanPage = () => {
  const router = useRouter(); // Ensure router is available only in client-side
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(true);
  const scannerRef = useRef<HTMLDivElement>(null);

  const handleScanSuccess = (decodedText: string) => {
    setScanResult(decodedText);
    router.push(`/scanQR/itemsDetails?id=${decodedText}`); // Redirect to item details page
  };

  useEffect(() => {
    if (isCameraActive && scannerRef.current) {
      const html5QrCodeScanner = new Html5QrcodeScanner(
        scannerRef.current.id,
        { fps: 10, qrbox: { width: 250, height: 250 } }, // Set scanning properties
        false
      );

      html5QrCodeScanner.render(
        (decodedText) => handleScanSuccess(decodedText),
        (error) => setErrorMessage(`Scan failed: ${error}`)
      );

      // Clean up scanner on unmount
      return () => {
        html5QrCodeScanner.clear();
      };
    }
  }, [isCameraActive]);

  // Function to handle file-based QR code scanning
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageData = e.target?.result;
        if (typeof imageData === 'string') {
          const image = new Image();
          image.src = imageData;
          image.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(image, 0, 0);
              const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
              const qrCode = jsQR(imageData.data, canvas.width, canvas.height);
              if (qrCode) {
                handleScanSuccess(qrCode.data); // Handle QR code data
              } else {
                setErrorMessage('Unable to scan the QR code from the image.');
              }
            }
          };
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Scan QR Code</h1>

      {/* Toggle between camera and file upload */}
      <div className="flex justify-around w-full mb-4">
        <button
          className={`btn ${isCameraActive ? 'btn-active' : ''}`}
          onClick={() => setIsCameraActive(true)}
        >
          Scan with Camera
        </button>
        <button
          className={`btn ${!isCameraActive ? 'btn-active' : ''}`}
          onClick={() => setIsCameraActive(false)}
        >
          Upload QR Image
        </button>
      </div>

      {isCameraActive ? (
        <div id="reader" ref={scannerRef}></div>
      ) : (
        <input type="file" accept="image/*" onChange={handleFileChange} />
      )}

      {/* Display error or success messages */}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {scanResult && <p className="text-green-500">Scan complete! Redirecting...</p>}
    </div>
  );
};

export default ScanPage;
