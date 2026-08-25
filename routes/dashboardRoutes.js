import {
  Router
} from "express";

import {
  getDashboardStats
} from "../controllers/dashboardController.js";

import {
  requireJWT
} from "../middleware/jwtMiddleware.js";


const router =
  Router();


router.get(
  "/stats",
  requireJWT,
  getDashboardStats
);


export default router;