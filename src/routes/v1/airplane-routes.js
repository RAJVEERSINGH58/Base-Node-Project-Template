const express = require("express");

const { AirplaneController } = require("../../controllers");
const { AirplaneMiddlewares } = require("../../middlewares");
const router = express.Router();

// /api/v1/airplane POST
router.post(
  "/",
  AirplaneMiddlewares.validateCreateRequest,
  AirplaneController.createAirplane
);

router.get(
  "/",
  AirplaneController.getAirplanes
);

router.get(
  "/:id",
  AirplaneController.getAirplane
);

// /api/v1/airplane/:id DELETE
router.delete(
  "/:id",
  AirplaneController.destroyAirplane
);

// /api/v1/airplane/:id UPDATE

router.patch(
  "/:id",
  AirplaneController.updateAirplane
);

module.exports = router;
