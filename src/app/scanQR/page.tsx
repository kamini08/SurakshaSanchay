


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
'use client';
import React, { useState } from 'react';
import { QrCode } from 'lucide-react';
import QRScanner from './QRScanner';
import ResultDisplay from './ResultDisplay';
import ScanHistory from './ScanHistory';
import DefaultLayout from "@/components/Layouts/DefaultLayout";

function App() {
  const [scanResult, setScanResult] = useState<string>('');
  const [scanHistory, setScanHistory] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  const handleScanResult = (result: string) => {
    setScanResult(result);
    setScanHistory((prev) => [result, ...prev]);
    setError('');
  };

  const handleError = (error: string) => {
    setError(error);
  };

  const handleClear = () => {
    setScanResult('');
    setError('');
  };

  const handleClearHistory = () => {
    setScanHistory([]);
  };

  return (
    <DefaultLayout>
    <div className="min-h-screen p-6 bg-white dark:bg-boxdark text-black dark:text-white">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <QrCode className="w-10 h-10 text-blue-500 mr-2" />
            <h1 className="text-3xl font-bold">QR Code Scanner</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Position the QR code within the camera view to scan. The scanner will automatically detect new codes.
          </p>
        </div>

        <div className="bg-white dark:bg-boxdark rounded-sm border shadow-default dark:border-strokedark text-sm font-medium text-black dark:text-white p-6 mb-6">
          <QRScanner onResult={handleScanResult} onError={handleError} />
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-200 p-4 rounded-sm border shadow-default dark:border-strokedark mb-6">
            {error}
          </div>
        )}

        {scanResult && (
          <div className="bg-white dark:bg-boxdark rounded-sm border shadow-default dark:border-strokedark text-sm font-medium text-black dark:text-white p-6 mb-6">
            <ResultDisplay result={scanResult} onClear={handleClear} />
          </div>
        )}

        <div className="bg-white dark:bg-boxdark rounded-sm border shadow-default dark:border-strokedark text-sm font-medium text-black dark:text-white p-6">
          <ScanHistory history={scanHistory} onClearHistory={handleClearHistory} />
        </div>
      </div>
    </div>
    </DefaultLayout>
  );
}

export default App;

