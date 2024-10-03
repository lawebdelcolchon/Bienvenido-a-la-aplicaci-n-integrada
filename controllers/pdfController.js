const PDF = require('../models/PDF');
const path = require('path');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

exports.getAllPDFs = (req, res) => {
  PDF.getAll((err, pdfs) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.render('pdf', { pdfs });
  });
};

exports.uploadPDF = (req, res) => {
  if (!req.file) {
    res.status(400).send('No se ha subido ningún archivo');
    return;
  }

  const pdfInfo = {
    nombre: req.file.originalname,
    ruta: req.file.path
  };

  PDF.create(pdfInfo, (err, id) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.redirect('/pdf');
  });
};

exports.deletePDF = (req, res) => {
  const { id } = req.params;
  PDF.delete(id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.redirect('/pdf');
  });
};

exports.mergePDFs = async (req, res) => {
  try {
    const { pdfIds } = req.body;
    const mergedPdf = await PDFDocument.create();

    for (const id of pdfIds) {
      const pdfPath = path.join(__dirname, '..', 'public', 'uploads', `${id}.pdf`);
      const pdfBytes = fs.readFileSync(pdfPath);
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const pdfBytes = await mergedPdf.save();
    const mergedFilePath = path.join(__dirname, '..', 'public', 'uploads', 'merged.pdf');
    fs.writeFileSync(mergedFilePath, pdfBytes);

    res.download(mergedFilePath, 'merged.pdf', (err) => {
      if (err) {
        console.error('Error al descargar el archivo:', err);
        res.status(500).send('Error al descargar el archivo fusionado');
      }
      fs.unlinkSync(mergedFilePath);
    });
  } catch (error) {
    console.error('Error al fusionar PDFs:', error);
    res.status(500).send('Error al fusionar PDFs');
  }
};