import express from "express";

import {
  getCafes
} from "../controllers/cafeController.js";

import {
  authenticateApiKey
} from "../middleware/kunciMiddleware.js";

const router = express.Router();

router.get(
  "/",
  authenticateApiKey,
  getCafes
);

export default router;