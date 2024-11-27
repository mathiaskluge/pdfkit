const { execSync } = require('child_process');
const fs = require('fs');

// Function to check if PDFKit is installed
function ensurePDFKitInstalled() {
  try {
    require.resolve('pdfkit');
    console.log('PDFKit is already installed.');
  } catch (error) {
    console.log('PDFKit is not installed. Installing now...');
    try {
      execSync('npm install pdfkit', { stdio: 'inherit' });
      console.log('PDFKit installed successfully.');
    } catch (installError) {
      console.error('Failed to install PDFKit:', installError);
      process.exit(1);
    }
  }
}

// Function to check if PDFkit image-size is installed
function ensureImageSizeInstalled() {
    try {
        require.resolve('pdfkit image-size');
        console.log('PDFKit image-size is already installed');
    } catch (error) {
        console.log('PDFKit image-size is not installed. Installing now   ');
        try {
            execSync('npm install pdfkit image-size', { stdio: 'inherit' });
        } catch (installError) {
            console.log('Failed to install PDFKit:', installError);
            process.exit(1)
        }
    }
}

// Ensure that node_modules exists before checking
if (!fs.existsSync('node_modules')) {
  console.log('node_modules folder is missing. Running `npm install`...');
  execSync('npm install', { stdio: 'inherit' });
}

// Check and install PDFKit
ensurePDFKitInstalled();
ensureImageSizeInstalled();
