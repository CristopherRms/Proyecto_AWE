const { Router } = require("express");
const { getAllUsers, createUser, deleteUserById, updateUserById } = require("../controllers/users");
const router=Router();
const { validateJWT } = require('../middlewares/verifyjwt');
const { verifyAdminRole } = require('../middlewares/verifyAdminRole');

router.get("/", getAllUsers);

router.post("/",createUser);

router.delete("/:id",[validateJWT, verifyAdminRole] , deleteUserById);
router.put("/:id",[validateJWT, verifyAdminRole], updateUserById);
module.exports = router;