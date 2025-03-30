const express = require("express");

const { AirportController } = require("../../controllers");
const { AirportMiddlewares } = require("../../middlewares");
const router = express.Router();

// /api/v1/airplane POST
router.post(
  "/",
  AirportMiddlewares.validateCreateRequest,
  AirportController.createAirport
);

router.get(
  "/",
  AirportController.getAirports
);

router.get(
  "/:id",
  AirportController.getAirport
);

// /api/v1/airports/:id DELETE
router.delete(
  "/:id",
  AirportController.destroyAirport
);

// /api/v1/airports/:id UPDATE


module.exports = router;
