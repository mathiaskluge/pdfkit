const PDFDocument = require('pdfkit');
const fs = require('fs');

// Create an invoice function
function generateInvoice() {
  const doc = new PDFDocument({ margin: 50 });

  // Pipe the document to a file
  doc.pipe(fs.createWriteStream('invoice.pdf'));

  // Add Header
  doc
    .fontSize(20)
    .text('Invoice', { align: 'center' })
    .moveDown();

  // Add Company Information
  doc
    .fontSize(10)
    .text('Company Name', 50, 50)
    .text('Street Address', 50, 65)
    .text('12345 City, Germany', 50, 80);

  // Add Customer Information
  doc
    .text('Customer Name', 400, 50)
    .text('Customer Street', 400, 65)
    .text('67890 City, Germany', 400, 80);

  // Invoice Details
  doc
    .moveDown()
    .text('Invoice Number: 12345', { align: 'left' })
    .text('Date: 2024-11-27', { align: 'left' });

  // Table Header
  const tableTop = 150;
  doc
    .fontSize(10)
    .text('Item', 50, tableTop)
    .text('Unit Price', 300, tableTop, { align: 'right' })
    .text('Quantity', 400, tableTop, { align: 'right' })
    .text('Total', 500, tableTop, { align: 'right' });

  // Table Rows
  const rowY = tableTop + 20;
  doc
    .text('Sample Item', 50, rowY)
    .text('€10.00', 300, rowY, { align: 'right' })
    .text('2', 400, rowY, { align: 'right' })
    .text('€20.00', 500, rowY, { align: 'right' });

  // Totals Section
  const totalsY = rowY + 40;
  doc
    .font('Helvetica-Bold')
    .text('Subtotal', 400, totalsY)
    .text('€20.00', 500, totalsY, { align: 'right' })
    .font('Helvetica')
    .text('VAT (19%)', 400, totalsY + 15)
    .text('€3.80', 500, totalsY + 15, { align: 'right' })
    .font('Helvetica-Bold')
    .text('Total', 400, totalsY + 30)
    .text('€23.80', 500, totalsY + 30, { align: 'right' });

  // Footer
  doc
    .fontSize(10)
    .text('Thank you for your business! Payment due within 14 days.', 50, 750, { align: 'center' });

  // Finalize PDF
  doc.end();
}

// Generate the invoice
generateInvoice();

