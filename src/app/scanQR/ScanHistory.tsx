// import React from 'react';
// import { History, Trash2 } from 'lucide-react';

// interface ScanHistoryProps {
//   history: string[];
//   onClearHistory: () => void;
// }

// const ScanHistory: React.FC<ScanHistoryProps> = ({ history, onClearHistory }) => {
//   if (history.length === 0) return null;

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto mt-6">
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center">
//           <History className="w-6 h-6 text-blue-500 mr-2" />
//           <h2 className="text-xl font-semibold">Scan History</h2>
//         </div>
//         <button
//           onClick={onClearHistory}
//           className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-md hover:bg-gray-100"
//           aria-label="Clear history"
//         >
//           <Trash2 className="w-5 h-5" />
//         </button>
//       </div>
//       <div className="space-y-2">
//         {history.map((result, index) => (
//           <div key={index} className="bg-gray-50 p-3 rounded-md text-sm text-gray-800 break-all">
//             {result}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ScanHistory;
import React from 'react';
import { History, Trash2 } from 'lucide-react';

interface ScanHistoryProps {
  history: string[];
  onClearHistory: () => void;
}

const ScanHistory: React.FC<ScanHistoryProps> = ({ history, onClearHistory }) => {
  if (history.length === 0) return null;

  return (
    <div className="bg-white dark:bg-boxdark p-6 rounded-lg shadow-md w-full max-w-md mx-auto mt-6 text-black dark:text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <History className="w-6 h-6 text-blue-500 dark:text-blue-400 mr-2" />
          <h2 className="text-xl font-semibold">Scan History</h2>
        </div>
        <button
          onClick={onClearHistory}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors p-1 rounded-md hover:bg-gray-100 dark:hover:bg-strokedark"
          aria-label="Clear history"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
      <div className="space-y-2">
        {history.map((result, index) => (
          <div
            key={index}
            className="bg-gray-50 dark:bg-strokedark p-3 rounded-md text-sm text-gray-800 dark:text-gray-200 break-all"
          >
            {result}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScanHistory;
