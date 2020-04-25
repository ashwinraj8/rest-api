const express = require('express');
const router = express.Router();

let mongoose = require('mongoose');
let multer = require('multer');
let checkAuth = require('../middleware/check-auth')
let ProductsController = require('../controllers/products');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + file.originalname);
    }
  });

  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  /*const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });*/

let upload = multer({storage: storage});



const Product = require('../models/products');

router.get('/',ProductsController.products_get_all);


router.post('/',checkAuth, upload.single('productImage'), ProductsController.product_create_product);

router.get('/:productId', ProductsController.product_get_product);

router.patch('/:productId', checkAuth, ProductsController.product_update_product);

router.delete('/:productId',checkAuth, ProductsController.product_delete_product);
module.exports = router;
