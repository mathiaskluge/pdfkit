const PDFDocument = require('pdfkit');
const fs = require('fs');

function generateInvoice() {
  const start = process.hrtime(); // Record start time
    
  // Create a new PDF document with A4 page size
  const doc = new PDFDocument({ size: 'A4', margin: 50 });

  // Pipe the document to a file
  const outputFile = 'invoice.pdf';
  const stream = fs.createWriteStream(outputFile);
  doc.pipe(stream);

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

  // Add Heading (Invoice Title, Positioned 11cm from top)
  const headingY = 100 * 2.83465; // 11 cm converted to points
  doc
    .fontSize(20)
    .font('Helvetica-Bold')
    .text('Invoice', 50, headingY);

  // Add Invoice Number Below the Heading
  const invoiceNumberY = headingY + 30;
  doc
    .fontSize(12)
    .font('Helvetica')
    .text('Invoice Number: INV-98765', 50, invoiceNumberY);

  // Add Paragraph Below the Invoice Number
  const paragraphY = invoiceNumberY + 30;
  doc
    .fontSize(10)
    .text(
      'This is a sample invoice generated using PDFKit. Below you will find details of the transaction, ' +
        'including the line items, taxes, and the total amount payable.',
      50,
      paragraphY,
      { width: 500, align: 'justify' }
    );

// Table Header
  const tableHeaderY = paragraphY + 60;
  doc
    .fontSize(10)
    .font('Helvetica-Bold')
    .text('Description', 50, tableHeaderY)
    .text('Item Price', 250, tableHeaderY, { align: 'right' })
    .text('Amount', 330, tableHeaderY, { align: 'right' })
    .text('Taxes', 400, tableHeaderY, { align: 'right' })
    .text('Subtotal', 480, tableHeaderY, { align: 'right' });

  // Example Invoice Items
  const items = [
    { description: 'Consulting Services', itemPrice: '€50.00', amount: '2', taxes: '19%', subtotal: '€119.00' },
    { description: 'Web Development', itemPrice: '€100.00', amount: '3', taxes: '19%', subtotal: '€357.00' },
    { description: 'Hosting Services', itemPrice: '€25.00', amount: '1', taxes: '19%', subtotal: '€29.75' },
  ];

  // Add Items to the Table
  let currentY = tableHeaderY + 20;
  items.forEach((item) => {
    doc
      .font('Helvetica')
      .fontSize(10)
      .text(item.description, 50, currentY, { width: 180 }) // Reserved space for description
      .text(item.itemPrice, 250, currentY, { align: 'right' }) // Item Price column
      .text(item.amount, 330, currentY, { align: 'right' }) // Amount column
      .text(item.taxes, 400, currentY, { align: 'right' }) // Taxes column
      .text(item.subtotal, 480, currentY, { align: 'right' }); // Subtotal column
    currentY += 20;
  });

  // Totals Area
  const totalsStartY = currentY + 40;
  const subtotal = '€450.00';
  const totalTaxes = '€85.50';
  const grandTotal = '€535.50';

  doc
    .font('Helvetica-Bold')
    .fontSize(10)
    .text('Subtotal:', 400, totalsStartY, { align: 'right' })
    .text(subtotal, 480, totalsStartY, { align: 'right' })
    .text('Taxes (19%):', 400, totalsStartY + 15, { align: 'right' })
    .text(totalTaxes, 480, totalsStartY + 15, { align: 'right' })
    .text('Total:', 400, totalsStartY + 30, { align: 'right' })
    .text(grandTotal, 480, totalsStartY + 30, { align: 'right' });

  // Footer Area
  const footerY = 780;

  // Example Company Info on the Bottom Left
  doc
    .fontSize(8)
    .text('Company Name\nIBAN: DE12345678901234567890\nBIC: GENODEF1P02\nBank: Example Bank', 50, footerY);


  // Add clickable link for the QR code
  doc
    .link(450, footerY - 40, 80, 80, '#blank')
    .fontSize(8)
    .text('Scan QR Code for details', 450, footerY + 50, { align: 'right' });


  // Finalize the document
  doc.end();

// Wait for the stream to finish writing
  stream.on('finish', () => {
    const [seconds, nanoseconds] = process.hrtime(start); // Calculate elapsed time
    const timeInMilliseconds = (seconds * 1000 + nanoseconds / 1e6).toFixed(2); // Convert to ms
    console.log(`PDF generated in ${timeInMilliseconds} ms.`);
  });
}

// Generate the invoice
generateInvoice();


