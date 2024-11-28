// 'use client';

// import React, { useState } from 'react';
// import axios from 'axios';
// import QrReader from 'react-qr-barcode-scanner';

// const ManageDevice: React.FC = () => {
//   const [formData, setFormData] = useState({
//     category: '',
//     type: '',
//     description: '',
//     quantity: 1,
//     location: '',
//     userId: '',
//   });
//   const [device, setDevice] = useState<any>(null);  // Device state to hold fetched data
//   const [newLocation, setNewLocation] = useState('');
//   const [qrScanResult, setQrScanResult] = useState<string | null>(null);
//   const [error, setError] = useState('');

//   // Handle input changes for the form
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Submit form to create a new device
//   const handleFormSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/api/addDevice', formData);
//       alert('Device added successfully!');
//       setFormData({
//         category: '',
//         type: '',
//         description: '',
//         quantity: 1,
//         location: '',
//         userId: '',
//       });
//     } catch (err) {
//       setError('Failed to add the device.');
//       console.error(err);
//     }
//   };

//   // Handle QR code scan
//   const handleScan = async (data: { text: string } | null) => {
//     if (data) {
//       try {
//         const response = await axios.get(`/api/device/${data.text}`);
//         setDevice(response.data);
//         setQrScanResult(data.text);
//         setError('');
//       } catch (err) {
//         setError('Failed to fetch device data.');
//         console.error(err);
//       }
//     }
//   };

//   const handleError = (err: any) => {
//     console.error(err);
//     setError('Error scanning QR code.');
//   };

//   // Update device location
//   const updateLocation = async () => {
//     if (device && newLocation) {
//       try {
//         await axios.put('/api/updateLocation', {
//           itemId: device.itemId,
//           newLocation,
//         });
//         setDevice({ ...device, location: newLocation });
//         alert('Location updated successfully!');
//       } catch (err) {
//         setError('Failed to update location.');
//         console.error(err);
//       }
//     }
//   };

//   return (
//     <div>
//       <h1>Manage Device Inventory</h1>

//       {/* Device Creation Form */}
//       <section>
//         <h2>Add New Device</h2>
//         <form onSubmit={handleFormSubmit}>
//           <label>
//             Category:
//             <select name="category" value={formData.category} onChange={handleInputChange}>
//               <option value="">Select Category</option>
//               <option value="COMMUNICATION_DEVICES">Communication Devices</option>
//               <option value="COMPUTER_AND_IT_EQUIPMENT">Computer and IT Equipment</option>
//               <option value="NETWORKING_EQUIPMENT">Networking Equipment</option>
//               <option value="SURVEILLANCE_AND_TRACKING">Surveillance and Tracking</option>
//               <option value="VEHICLE_AND_ACCESSORIES">Vehicle and Accessories</option>
//               <option value="PROTECTIVE_GEAR">Protective Gear</option>
//               <option value="FIREARMS">Firearms</option>
//               <option value="FORENSIC">Forensic Equipment</option>
//               <option value="MEDICAL_FIRST_AID">Medical First Aid</option>
//               <option value="OFFICE_SUPPLIES">Office Supplies</option>
//             </select>
//           </label>
//           <label>
//             Type:
//             <input
//               type="text"
//               name="type"
//               value={formData.type}
//               onChange={handleInputChange}
//               placeholder="Enter device type"
//               required
//             />
//           </label>
//           <label>
//             Description:
//             <input
//               type="text"
//               name="description"
//               value={formData.description}
//               onChange={handleInputChange}
//               placeholder="Enter description"
//             />
//           </label>
//           <label>
//             Quantity:
//             <input
//               type="number"
//               name="quantity"
//               value={formData.quantity}
//               onChange={handleInputChange}
//               required
//             />
//           </label>
//           <label>
//             Location:
//             <input
//               type="text"
//               name="location"
//               value={formData.location}
//               onChange={handleInputChange}
//               required
//             />
//           </label>
//           <label>
//             User ID:
//             <input
//               type="text"
//               name="userId"
//               value={formData.userId}
//               onChange={handleInputChange}
//               required
//             />
//           </label>
//           <button type="submit">Add Device</button>
//         </form>
//       </section>

//       <hr />

//       {/* QR Code Scanner */}
//       <section>
//         <h2>Scan QR Code to Track Device</h2>
//         <QrReader
//           onUpdate={(err: unknown, result: unknown) => {
//             if (result && typeof result === 'object' && 'text' in result) {
//               handleScan(result as { text: string });
//             }
//             if (err) {
//               handleError(err);
//             }
//           }}
//           // style={{ width: '100%' }}
//         />
//         {qrScanResult && device ? (
//           <div>
//             <h3>Device Information</h3>
//             <p><strong>ID:</strong> {device.itemId}</p>
//             <p><strong>Category:</strong> {device.category}</p>
//             <p><strong>Type:</strong> {device.type}</p>
//             <p><strong>Location:</strong> {device.location}</p>
//             <p><strong>Description:</strong> {device.description}</p>
//             <p><strong>Condition:</strong> {device.condition}</p>

//             <h3>Update Location</h3>
//             <input
//               type="text"
//               placeholder="New Location"
//               value={newLocation}
//               onChange={(e) => setNewLocation(e.target.value)}
//             />
//             <button onClick={updateLocation}>Update Location</button>
//           </div>
//         ) : (
//           <p>Scan a QR code to fetch device details.</p>
//         )}
//       </section>

//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </div>
//   );
// };

// export default ManageDevice;
// src/app/manageDevice.tsx
// 'use client';
// import React, { useState } from 'react';
// import axios from 'axios';
// import QrReader from 'react-qr-barcode-scanner';

// const ManageDevice: React.FC = () => {
//   const [formData, setFormData] = useState({
//     itemId: '',
//     category: '',
//     type: '',
//     description: '',
//     quantity: 1,
//     location: '',
//     userId: '',
//   });
//   const [device, setDevice] = useState<any>(null);
//   const [newLocation, setNewLocation] = useState('');
//   const [qrScanResult, setQrScanResult] = useState<string | null>(null);
//   const [error, setError] = useState('');

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFormSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await axios.post('/api/qrscanner/device/addDevice', formData);
//       alert('Device added successfully!');
//       setFormData({
//         itemId: '',
//         category: '',
//         type: '',
//         description: '',
//         quantity: 1,
//         location: '',
//         userId: '',
//       });
//     } catch (err) {
//       setError('Failed to add the device.');
//       console.error(err);
//     }
//   };

//   const handleScan = async (result: { text: string } | null) => {
//     if (result) {
//       try {
//         const response = await axios.get(`/api/qrscanner/device/${result.text}`);
//         setDevice(response.data);
//         setQrScanResult(result.text);
//         setError('');
//       } catch (err) {
//         setError('Failed to fetch device data.');
//         console.error(err);
//       }
//     }
//   };

//   const handleError = (err: any) => {
//     console.error(err);
//     setError('Error scanning QR code.');
//   };

//   const updateLocation = async () => {
//     if (device && newLocation) {
//       try {
//         await axios.put('/api/qrscanner/device/updateLocation', {
//           itemId: device.itemId,
//           newLocation,
//         });
//         alert('Location updated successfully!');
//       } catch (err) {
//         setError('Failed to update location.');
//         console.error(err);
//       }
//     }
//   };

//   return (
//     <div>
//       <h1>Manage Device Inventory</h1>

//       {/* Add New Device Form */}
//       <form onSubmit={handleFormSubmit}>
//         <label>
//           Item ID:
//           <input
//             type="text"
//             name="itemId"
//             value={formData.itemId}
//             onChange={handleInputChange}
//             required
//           />
//         </label>
//         {/* Add other form fields here */}
//         <button type="submit">Add Device</button>
//       </form>

//       <hr />

//       {/* QR Code Scanner */}
//       <div style={{ width: '100%' }}>
//         {/* <QrReader
//           onUpdate={(err, result) => {
//             if (result && typeof result === 'object' && 'text' in result) {
//               handleScan(result as { text: string });
//             }
//             if (err) {
//               handleError(err);
//             }
//           }}
//         /> */}
//         {/* <QrReader
//   onUpdate={(err, result) => {
//     if (result) {
//       // Check if result has a method or property to extract the text
//       const textResult = result?.text || (typeof result === 'object' && 'getText' in result && (result as any).getText());
      
//       if (textResult) {
//         handleScan({ text: textResult });
//       }
//     }

//     if (err) {
//       handleError(err);
//     }
//   }}
// /> */}
// <QrReader
//   onUpdate={(err, result) => {
//     if (result) {
//       console.log(result); // Inspect the result object to see its structure
//     }

//     if (err) {
//       handleError(err);
//     }
//   }}
// />
//       </div>

//       {qrScanResult && device ? (
//         <div>
//           <h3>Device Information</h3>
//           <p>ID: {device.itemId}</p>
//           {/* Display other device details */}
//           <h3>Update Location</h3>
//           <input
//             type="text"
//             placeholder="New Location"
//             value={newLocation}
//             onChange={(e) => setNewLocation(e.target.value)}
//           />
//           <button onClick={updateLocation}>Update Location</button>
//         </div>
//       ) : (
//         <p>Scan a QR code to fetch device details.</p>
//       )}

//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </div>
//   );
// };

// export default ManageDevice;
'use client';
import React, { useState } from 'react';
import QRCode from 'react-qr-code'; // Import QR code generator
import 'tailwindcss/tailwind.css';

const GenerateQR = () => {
  const [itemId, setItemId] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);

  const handleGenerateQR = () => {
    if (itemId.trim() !== '') {
      setShowQRCode(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Generate QR Code</h1>
      <input
        type="text"
        value={itemId}
        onChange={(e) => setItemId(e.target.value)}
        placeholder="Enter Item ID"
        className="p-2 border border-gray-400 rounded w-64 mb-4"
      />
      <button
        onClick={handleGenerateQR}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Generate QR Code
      </button>

      {showQRCode && (
        <div className="mt-6">
          <h2 className="text-xl mb-2">QR Code for Item ID: {itemId}</h2>
          <QRCode value={itemId} size={200} />
        </div>
      )}
    </div>
  );
};

export default GenerateQR;
