# QR Code Reader-Generator

This is a single-file, self-contained React application that serves as a QR Code Generator and Scanner. The application is built with React, TypeScript, and Tailwind CSS, and it adheres to the Material 3 / Material Expressive design language.

## Features

- **Mode Switching:** A visually engaging segmented control to switch between "Generator" and "Scanner" modes.
- **QR Code Generator:**
  - Dynamically generates QR codes using the `qrcode.react` library.
  - A large, elevated textarea for user input.
  - A primary action button to download the QR code as a PNG image.
- **QR Code Scanner:**
  - Uses the `html5-qrcode` library for camera access and scanning.
  - Displays a live camera feed with a visual frame for scanning.
  - On successful scan, displays the result in a Material 3-styled modal with options to "Copy Result" and "Restart Scan."
- **Dark Mode:** A toggle switch to enable and disable dark mode.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username_/your_repository.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start the development server
   ```sh
    npm start
    ```

## Usage

- **Generator Mode:**
  1. Enter the text or URL you want to encode in the textarea.
  2. The QR code will be generated automatically.
  3. Click the "Download QR" button to save the QR code as a PNG file.

- **Scanner Mode:**
  1. Switch to "Scanner" mode using the segmented control.
  2. Allow the browser to access your camera.
  3. Point the camera at a QR code to scan it.
  4. The scanned result will be displayed in a modal.
  5. You can copy the result to your clipboard or restart the scan.

- **Dark Mode:**
  - Use the toggle switch at the bottom of the application to switch between light and dark mode.
