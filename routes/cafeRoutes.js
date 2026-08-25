import {
  Router
} from "express";

import {
  getCafes,
  getCafeById,
  getCafeStats
} from "../controllers/cafeController.js";

import {
  requireApiKey
} from "../middleware/apiKeyMiddleware.js";


const router =
  Router();


router.get(
  "/",
  requireApiKey,
  getCafes
);


router.get(
  "/meta/stats",
  requireApiKey,
  getCafeStats
);


router.get(
  "/:id",
  requireApiKey,
  getCafeById
);


export default router;