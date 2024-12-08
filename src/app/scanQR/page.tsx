// 'use client';
// import React, { useState } from 'react';
// import { QrCode } from 'lucide-react';
// import QRScanner from './QRScanner';
// import ResultDisplay from './ResultDisplay';
// import ScanHistory from './ScanHistory';
// // import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
// import DefaultLayout from "@/components/Layouts/DefaultLayout";

// function App() {
//   const [scanResult, setScanResult] = useState<string>('');
//   const [scanHistory, setScanHistory] = useState<string[]>([]);
//   const [error, setError] = useState<string>('');

//   const handleScanResult = (result: string) => {
//     setScanResult(result);
//     setScanHistory((prev) => [result, ...prev]);
//     setError('');
//   };

//   const handleError = (error: string) => {
//     setError(error);
//   };

//   const handleClear = () => {
//     setScanResult('');
//     setError('');
//   };

//   const handleClearHistory = () => {
//     setScanHistory([]);
//   };

//   return (

//     <div className="min-h-screen  p-6  bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//       <div className="max-w-2xl mx-auto">
//         <div className="text-center mb-8">
//           <div className="flex items-center justify-center mb-4">
//             <QrCode className="w-10 h-10 text-blue-500 mr-2" />
//             <h1 className="text-3xl font-bold text-gray-800">QR Code Scanner</h1>
//           </div>
//           <p className="text-gray-600">
//             Position the QR code within the camera view to scan. The scanner will automatically detect new codes.
//           </p>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//           <QRScanner onResult={handleScanResult} onError={handleError} />
//         </div>

//         {error && (
//           <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
//             {error}
//           </div>
//         )}

//         {scanResult && <ResultDisplay result={scanResult} onClear={handleClear} />}

//         <ScanHistory history={scanHistory} onClearHistory={handleClearHistory} />
//       </div>
//     </div>

//   );
// }

// export default App;
"use client";
import React, { useState } from "react";
import { QrCode } from "lucide-react";
import QRScanner from "./QRScanner";
import ResultDisplay from "./ResultDisplay";
import ScanHistory from "./ScanHistory";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

function App() {
  const [scanResult, setScanResult] = useState<string>("");
  const [scanHistory, setScanHistory] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  const handleScanResult = (result: string) => {
    setScanResult(result);
    setScanHistory((prev) => [result, ...prev]);
    setError("");
  };

  const handleError = (error: string) => {
    setError(error);
  };

  const handleClear = () => {
    setScanResult("");
    setError("");
  };

  const handleClearHistory = () => {
    setScanHistory([]);
  };

  return (
    <div className="mx-auto w-auto p-4 md:p-6 2xl:p-10">
      <div className="min-h-screen bg-white p-6 text-black dark:bg-boxdark dark:text-white">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <div className="mb-4 flex items-center justify-center">
              <QrCode className="mr-2 h-10 w-10 text-blue-500" />
              <h1 className="text-3xl font-bold">QR Code Scanner</h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Position the QR code within the camera view to scan. The scanner
              will automatically detect new codes.
            </p>
          </div>

          <div className="mb-6 rounded-sm border bg-white p-6 text-sm font-medium text-black shadow-default dark:border-strokedark dark:bg-boxdark dark:text-white">
            <QRScanner onResult={handleScanResult} onError={handleError} />
          </div>

          {error && (
            <div className="mb-6 rounded-sm border bg-red-50 p-4 text-red-700 shadow-default dark:border-strokedark dark:bg-red-900 dark:text-red-200">
              {error}
            </div>
          )}

          {scanResult && (
            <div className="mb-6 rounded-sm border bg-white p-6 text-sm font-medium text-black shadow-default dark:border-strokedark dark:bg-boxdark dark:text-white">
              <ResultDisplay result={scanResult} onClear={handleClear} />
            </div>
          )}

          <div className="rounded-sm border bg-white p-6 text-sm font-medium text-black shadow-default dark:border-strokedark dark:bg-boxdark dark:text-white">
            <ScanHistory
              history={scanHistory}
              onClearHistory={handleClearHistory}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
