// server/routes/productRoutes.js

import express from "express"
const { getAllProducts, getProductById } = require('../controllers/productController');

const router = express.Router();

router.get('/', getAllProducts);        // GET /api/products
router.get('/:id', getProductById);    // GET /api/products/123

module.exports = router;