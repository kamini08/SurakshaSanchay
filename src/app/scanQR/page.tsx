
// 'use client';
// import { useState } from 'react';
// import dynamic from 'next/dynamic';

// const QrScanner = dynamic(() => import('react-qr-scanner'), {
//   ssr: false, // Disable server-side rendering for this component
// });

// export default function ScanQR() {
//   const [scanResult, setScanResult] = useState<string | null>(null);

//   const handleScan = (result: any) => {
//     if (result && result.text) {
//       try {
//         setScanResult(result.text); // Get the text from scanned barcode/QR code
//       } catch (error) {
//         console.error("Error parsing scan result:", error);
//       }
//     } else {
//       console.warn("No valid data in the QR code.");
//     }
//   };

//   const handleError = (error: any) => {
//     console.error("QR Scanner Error:", error);
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-4">Scan QR Code / Barcode</h1>
//       <QrScanner
//         delay={300}
//         onScan={handleScan}
//         onError={handleError}
//         style={{ width: '100%' }}
//       />
      
//       {scanResult && (
//         <div className="mt-6">
//           <h2 className="text-xl mb-2">Scanned Item ID: {scanResult}</h2>
//           {/* You can add a call to an API here to fetch item details */}
//         </div>
//       )}
//     </div>
//   );
// }
'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const QrScanner = dynamic(() => import('react-qr-scanner'), {
  ssr: false, // Disable server-side rendering for this component
});

export default function ScanQR() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScan = (result: any) => {
    if (result && result.text) {
      try {
        const scannedData = result.text;

        // Ensure scanned data is valid JSON
        const parsedData = JSON.parse(scannedData);
        setScanResult(parsedData.itemId || scannedData); // Assuming itemId in QR code

      } catch (error) {
        console.error("Error parsing scan result:", error);
        setError("Invalid QR code data.");
      }
    } else {
      console.warn("No valid data in the QR code.");
      setError("No valid QR code detected.");
    }
  };

  const handleError = (error: any) => {
    console.error("QR Scanner Error:", error);
    setError("QR Scanner error.");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Scan QR Code / Barcode</h1>
      <QrScanner
        delay={300}
        onScan={handleScan}
        onError={handleError}
        style={{ width: '100%' }}
      />
      
      {error && <p className="text-red-500">{error}</p>}

      {scanResult && (
        <div className="mt-6">
          <h2 className="text-xl mb-2">Scanned Item ID: {scanResult}</h2>
          {/* You can add a call to an API here to fetch item details */}
        </div>
      )}
    </div>
  );
}
