const express = require("express");

const { CityController } = require("../../controllers");
const { CityMiddlewares } = require("../../middlewares");

const router = express.Router();

// /api/v1/city POST
router.post(
  "/",
  CityMiddlewares.validateCreateRequestCity,
  CityController.createCity,
);


router.delete(
  "/:id",
  CityController.destroyCity,
);


router.patch(
  "/:id",
  CityController.updateCity,
);

module.exports = router;