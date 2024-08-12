const express = require('express');
const multer = require('multer');
const path = require('path');
const { createProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/productController');

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename:(req, file, cb) => {
    cb(null,Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

router.post('/', upload.single('image'), createProduct);
router.get('/', getProducts);
router.put('/:id', upload.single('image'), updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
