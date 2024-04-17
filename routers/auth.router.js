const { Router } = require("express");
const router = Router();
//const { producto } = require("../index");
const authRequired = require("../middlewares/validateToken");

//router.post("/register", register);
// router.post("/login", login);
// router.post("/logout", login);
// router.post("/register", register);
// router.get("/UserData", getUserData);
//router.post("/producto", producto);
//router.post("/producto", authRequired.Producto);
// router.post("/producto", authRequired.getAllProducto);

module.exports=router