const PDFDocument = require('pdfkit');
const fs = require('fs');

function generateInvoice() {
  // Create a new PDF document with A4 page size
  const doc = new PDFDocument({ size: 'A4', margin: 50 });

  // Pipe the document to a file
  doc.pipe(fs.createWriteStream('invoice.pdf'));

  // A4 dimensions in points: 595.28 x 841.89 (width x height)

  // Load the logo file and scale it proportionally
  const logoPath = 'assets/logo.png'; // Replace with your logo file path
  const maxLogoWidth = 100 * 2.83465; // 5 cm in points
  const maxLogoHeight = 30 * 2.83465; // 3 cm in points

  // Get image dimensions using the 'image-size' library
  const sizeOf = require('image-size');
  const dimensions = sizeOf(logoPath);

  // Calculate scaling factor for the logo
  const scalingFactor = Math.min(maxLogoWidth / dimensions.width, maxLogoHeight / dimensions.height);

  // Calculate scaled dimensions
  const scaledWidth = dimensions.width * scalingFactor;
  const scaledHeight = dimensions.height * scalingFactor;

  // Draw the logo (Top Left)
  doc.image(logoPath, 50, 50, { width: scaledWidth });

  // Company Information and Invoice Details (Top Right)
  const topRightX = 400; // Starting X position for the top-right block
  const topRightY = 50; // Starting Y position for the top-right block
  doc
    .fontSize(10)
    .text('Company Name', topRightX, topRightY)
    .text('Street Address', topRightX, topRightY + 15)
    .text('12345 City, Germany', topRightX, topRightY + 30)
    .moveDown(1);

  // Add Example IDs
  doc
    .text('Customer ID: CUST-001', topRightX, topRightY + 60)
    .text('Job ID: JOB-12345', topRightX, topRightY + 75)
    .text('Invoice ID: INV-98765', topRightX, topRightY + 90);

  // Customer Address Block (Positioned 65mm from top and 20mm from left)
  const customerAddressX = 20 * 2.83465; // Convert 20mm to points
  const customerAddressY = 65 * 2.83465; // Convert 65mm to points
  doc
    .fontSize(10)
    .text('Customer Name', customerAddressX, customerAddressY)
    .text('Customer Street', customerAddressX, customerAddressY + 15)
    .text('67890 City, Germany', customerAddressX, customerAddressY + 30);

  // Finalize the document
  doc.end();
}

// Generate the invoice
generateInvoice();

