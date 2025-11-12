
import React, { useState, useEffect, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const App: React.FC = () => {
  const [mode, setMode] = useState<'generator' | 'scanner'>('generator');
  const [text, setText] = useState('');
  const [scanResult, setScanResult] = useState<string | null>(null);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (mode === 'scanner') {
      const scanner = new Html5QrcodeScanner(
        'qr-reader',
        { fps: 10, qrbox: 250 },
        false
      );
      scannerRef.current = scanner;

      const onScanSuccess = (decodedText: string) => {
        setScanResult(decodedText);
        scanner.clear();
      };

      scanner.render(onScanSuccess, undefined);

      return () => {
        scanner.clear();
      };
    }
  }, [mode]);

  const handleDownload = () => {
    const canvas = document.getElementById('qr-code') as HTMLCanvasElement;
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  const handleCopy = () => {
    if (scanResult) {
      navigator.clipboard.writeText(scanResult);
    }
  };

  const handleRestart = () => {
    setScanResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center font-sans">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-3xl shadow-3xl">
        <div className="flex justify-center mb-6">
          <div className="relative flex p-1 bg-gray-200 dark:bg-gray-700 rounded-full">
            <button
              onClick={() => setMode('generator')}
              className={`relative z-10 px-6 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
                mode === 'generator' ? 'text-white' : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              Generator
            </button>
            <button
              onClick={() => setMode('scanner')}
              className={`relative z-10 px-6 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
                mode === 'scanner' ? 'text-white' : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              Scanner
            </button>
            <div
              className={`absolute top-1 bottom-1 left-1 w-1/2 bg-primary-600 rounded-full transform transition-transform duration-300 ${
                mode === 'scanner' ? 'translate-x-full' : ''
              }`}
            ></div>
          </div>
        </div>

        {mode === 'generator' && (
          <div className="space-y-6 text-center">
            <div
              className="flex justify-center items-center p-4 bg-white dark:bg-gray-700 rounded-3xl shadow-inner"
            >
              <QRCodeCanvas
                id="qr-code"
                value={text || 'www.linkedin.com/in/invictus596'}
                size={256}
                bgColor={isDarkMode ? '#374151' : '#ffffff'}
                fgColor={isDarkMode ? '#ffffff' : '#000000'}
                level={'H'}
              />
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text or URL"
              className="w-full p-4 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-3xl shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500"
              rows={4}
            ></textarea>
            <button
              onClick={handleDownload}
              className="w-full px-6 py-3 text-white bg-primary-600 rounded-full shadow-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Download QR
            </button>
          </div>
        )}

        {mode === 'scanner' && (
          <div className="space-y-6">
            {scanResult ? (
              <div className="p-6 space-y-4 bg-white dark:bg-gray-800 rounded-3xl shadow-xl">
                <h3 className="text-lg font-semibold text-center text-gray-800 dark:text-white">Scan Result</h3>
                <p className="text-center text-gray-600 dark:text-gray-300 break-all">{scanResult}</p>
                <div className="flex space-x-4">
                  <button
                    onClick={handleCopy}
                    className="w-full px-4 py-2 text-white bg-primary-600 rounded-full shadow-lg hover:bg-primary-700 focus:outline-none"
                  >
                    Copy Result
                  </button>
                  <button
                    onClick={handleRestart}
                    className="w-full px-4 py-2 text-primary-600 bg-gray-100 dark:bg-gray-700 rounded-full shadow-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none"
                  >
                    Restart Scan
                  </button>
                </div>
              </div>
            ) : (
              <div id="qr-reader" className="w-full"></div>
            )}
          </div>
        )}
        <div className="flex items-center justify-center mt-6">
          <span className="text-gray-700 dark:text-gray-300 mr-3">Light Mode</span>
          <label htmlFor="darkModeToggle" className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="darkModeToggle"
              className="sr-only peer"
              checked={isDarkMode}
              onChange={() => setIsDarkMode(!isDarkMode)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
          </label>
          <span className="text-gray-700 dark:text-gray-300 ml-3">Dark Mode</span>
        </div>
      </div>
    </div>
  );
};

export default App;
