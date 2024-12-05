const { Router } = require("express");
const { getAllProducts, createProduct, getProductById, deleteProductById, updateProductById, getCatProducts } = require("../controllers/products");
const { get } = require("mongoose");
const { validateJWT } = require("../middlewares/verifyjwt");
const router=Router();
const{verifyAdminRole}= require("../middlewares/verifyAdminRole");
router.get("/", getAllProducts);

router.post("/",[validateJWT, verifyAdminRole],createProduct);

router.get("/:id",getProductById);
router.get("/category/:category", getCatProducts);

router.delete("/:id",[validateJWT, verifyAdminRole], deleteProductById);
router.put("/:id",[validateJWT, verifyAdminRole], updateProductById);
module.exports = router;