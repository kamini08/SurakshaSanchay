import { useState, useEffect, useCallback } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

interface UseQRScannerProps {
  onResult: (result: string) => void;
  onError: (error: string) => void;
}

export const useQRScanner = ({ onResult, onError }: UseQRScannerProps) => {
  const [scanner, setScanner] = useState<Html5Qrcode | null>(null);
  const [cameras, setCameras] = useState<Array<{ id: string; label: string }>>([]);
  const [selectedCamera, setSelectedCamera] = useState<string>('');
  const [isScanning, setIsScanning] = useState(false);
  const [lastScanned, setLastScanned] = useState<string>('');

  useEffect(() => {
    const html5QrCode = new Html5Qrcode('qr-reader');
    setScanner(html5QrCode);

    Html5Qrcode.getCameras()
      .then((devices) => {
        const availableCameras = devices.map((device) => ({
          id: device.id,
          label: device.label,
        }));
        setCameras(availableCameras);
        if (availableCameras.length > 0) {
          setSelectedCamera(availableCameras[0].id);
        }
      })
      .catch((err) => {
        onError('Error getting cameras: ' + err);
      });

    return () => {
      if (html5QrCode.isScanning) {
        html5QrCode.stop().catch(console.error);
      }
    };
  }, [onError]);

  const startScanning = useCallback(async () => {
    if (!scanner || !selectedCamera) return;

    try {
      await scanner.start(
        selectedCamera,
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        async (decodedText) => {
          // Only trigger if this is a new QR code
          if (decodedText !== lastScanned) {
            setLastScanned(decodedText);
            onResult(decodedText);
            // Automatically stop scanning after successful read
            await stopScanning();
          }
        },
        (errorMessage) => {
          // Ignore the NotFoundException as it's thrown frequently during scanning
          if (!errorMessage.includes('NotFoundException')) {
            onError(errorMessage);
          }
        }
      );
      setIsScanning(true);
    } catch (err) {
      onError('Error starting scanner: ' + err);
    }
  }, [scanner, selectedCamera, onResult, onError, lastScanned]);

  const stopScanning = useCallback(async () => {
    if (scanner && scanner.isScanning) {
      try {
        await scanner.stop();
        setIsScanning(false);
        setLastScanned(''); // Reset last scanned when stopping
      } catch (err) {
        onError('Error stopping scanner: ' + err);
      }
    }
  }, [scanner, onError]);

  const switchCamera = useCallback(async (cameraId: string) => {
    if (isScanning) {
      await stopScanning();
    }
    setSelectedCamera(cameraId);
  }, [isScanning, stopScanning]);

  return {
    cameras,
    selectedCamera,
    isScanning,
    startScanning,
    stopScanning,
    switchCamera,
  };
};