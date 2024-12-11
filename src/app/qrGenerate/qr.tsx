"use client"; // Required for client-side React components
import React, { useState, useRef } from "react";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";

const GenerateQR: React.FC = () => {
  const [itemId, setItemId] = useState("");
  const [showQRCode, setShowQRCode] = useState(false);
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const handleGenerateQR = () => {
    if (itemId.trim() !== "") {
      setShowQRCode(true);
    }
  };

  const downloadQRCode = async () => {
    if (qrCodeRef.current) {
      const canvas = await html2canvas(qrCodeRef.current);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `${itemId}-qrcode.png`;
      link.click();
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-white pt-20  shadow-default dark:border-strokedark dark:bg-boxdark">
      <h1 className="mb-8 text-3xl font-bold">Generate QR Code</h1>
      <input
        type="text"
        value={itemId}
        onChange={(e) => setItemId(e.target.value)}
        placeholder="Enter Item ID"
        className="mb-4 w-64 rounded border border-gray-400 p-2"
      />
      <button
        onClick={handleGenerateQR}
        className="mb-4 rounded bg-blue-500 px-4 py-2 text-white"
      >
        Generate QR Code
      </button>
      {showQRCode && (
        <div className="mt-6 flex flex-col items-center justify-center">
          <h2 className="mb-2 text-xl">QR Code for Item ID: {itemId}</h2>
          <div ref={qrCodeRef} className="bg-white p-4">
            <QRCode value={itemId} size={200} />
          </div>
          <button
            onClick={downloadQRCode}
            className="mt-4 rounded bg-green-500 px-4 py-2 text-white "
          >
            Download QR Code
          </button>
        </div>
      )}
    </div>
  );
};

export default GenerateQR;
