const express = require("express");

const { InfoController } = require("../../controllers");
const userRoutes = require("./user-routers");
const { AuthRequestMiddlewares } = require("../../middlewares");
const router = express.Router();

router.get("/info", AuthRequestMiddlewares.checkAuth, InfoController.info);
router.use("/user", userRoutes);

module.exports = router;
