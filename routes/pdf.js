const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const pdfController = require('../controllers/pdfController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.get('/', pdfController.getAllPDFs);
router.post('/upload', upload.single('pdf'), pdfController.uploadPDF);
router.get('/delete/:id', pdfController.deletePDF);
router.post('/merge', pdfController.mergePDFs);

module.exports = router;