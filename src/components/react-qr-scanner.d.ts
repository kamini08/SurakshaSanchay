
// declare module 'react-qr-scanner' {
//   import { ComponentType } from 'react';

//   interface QRScannerProps {
//     delay?: number;
//     onScan: (result: { text: string } | null) => void;  // Allowing null result
//     onError: (error: any) => void;
//     style?: React.CSSProperties;
//   }

//   const QrScanner: ComponentType<QRScannerProps>;

//   export default QrScanner;
// }
declare module 'react-qr-scanner' {
  import { ComponentType } from 'react';

  interface QRScannerProps {
    delay?: number;
    onScan: (result: { text: string } | null) => void;  // Allowing null result
    onError: (error: any) => void;
    style?: React.CSSProperties;
  }

  const QrScanner: ComponentType<QRScannerProps>;

  export default QrScanner;
}

