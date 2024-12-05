// import React from 'react';
// import { Camera, Play, Square } from 'lucide-react';
// import { useQRScanner } from '@/hooks/useQRScanner';

// interface QRScannerProps {
//   onResult: (result: string) => void;
//   onError: (error: string) => void;
// }

// const QRScanner: React.FC<QRScannerProps> = ({ onResult, onError }) => {
//   const {
//     cameras,
//     selectedCamera,
//     isScanning,
//     startScanning,
//     stopScanning,
//     switchCamera,
//   } = useQRScanner({ onResult, onError });

//   return (
//     <div className="w-full max-w-md mx-auto bg-white dark:bg-boxdark rounded-sm border shadow-default dark:border-strokedark text-sm font-medium text-black dark:text-white">
//       <div className="mb-4">
//         <label htmlFor="camera-select" className="block text-sm font-medium text-gray-700 mb-2">
//           Select Camera
//         </label>
//         <div className="flex gap-2">
//           <select
//             id="camera-select"
//             value={selectedCamera}
//             onChange={(e) => switchCamera(e.target.value)}
//             className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white px-3 py-2"
//             disabled={isScanning}
//           >
//             {cameras.map((camera) => (
//               <option key={camera.id} value={camera.id}>
//                 {camera.label || `Camera ${camera.id}`}
//               </option>
//             ))}
//           </select>
//           <button
//             onClick={isScanning ? stopScanning : startScanning}
//             className={`flex items-center justify-center px-4 py-2 rounded-md text-white ${
//               isScanning ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
//             } transition-colors`}
//           >
//             {isScanning ? (
//               <>
//                 <Square className="w-4 h-4 mr-2" />
//                 Stop
//               </>
//             ) : (
//               <>
//                 <Play className="w-4 h-4 mr-2" />
//                 Start
//               </>
//             )}
//           </button>
//         </div>
//       </div>

//       <div className="relative">
//         <div 
//           id="qr-reader" 
//           className="w-full aspect-video bg-black rounded-lg overflow-hidden"
//         />
//         {!isScanning && (
//           <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
//             <div className="text-white text-center">
//               <Camera className="w-12 h-12 mx-auto mb-2" />
//               <p>Click Start to begin scanning</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default QRScanner;
import React from 'react';
import { Camera, Play, Square } from 'lucide-react';
import { useQRScanner } from '@/hooks/useQRScanner';

interface QRScannerProps {
  onResult: (result: string) => void;
  onError: (error: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onResult, onError }) => {
  const {
    cameras,
    selectedCamera,
    isScanning,
    startScanning,
    stopScanning,
    switchCamera,
  } = useQRScanner({ onResult, onError });

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-boxdark rounded-sm border shadow-default dark:border-strokedark text-sm font-medium text-black dark:text-white">
      <div className="mb-4">
        <label
          htmlFor="camera-select"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Select Camera
        </label>
        <div className="flex gap-2">
          <select
            id="camera-select"
            value={selectedCamera}
            onChange={(e) => switchCamera(e.target.value)}
            className="block w-full rounded-md border-gray-300 dark:border-strokedark shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-boxdark text-black dark:text-white px-3 py-2"
            disabled={isScanning}
          >
            {cameras.map((camera) => (
              <option key={camera.id} value={camera.id}>
                {camera.label || `Camera ${camera.id}`}
              </option>
            ))}
          </select>
          <button
            onClick={isScanning ? stopScanning : startScanning}
            className={`flex items-center justify-center px-4 py-2 rounded-md text-white ${
              isScanning
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-blue-500 hover:bg-blue-600'
            } transition-colors`}
          >
            {isScanning ? (
              <>
                <Square className="w-4 h-4 mr-2" />
                Stop
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Start
              </>
            )}
          </button>
        </div>
      </div>

      <div className="relative">
        <div
          id="qr-reader"
          className="w-full aspect-video bg-gray-200 dark:bg-boxdark rounded-lg overflow-hidden"
        />
        {!isScanning && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-70 rounded-lg">
            <div className="text-white text-center">
              <Camera className="w-12 h-12 mx-auto mb-2" />
              <p>Click Start to begin scanning</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRScanner;
