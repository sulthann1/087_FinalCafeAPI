import {
  Router
} from "express";

import {
  register,
  login,
  getMe,
  createApiKey,
  getApiKeys
} from "../controllers/authController.js";

import {
  requireJWT
} from "../middleware/jwtMiddleware.js";


const router =
  Router();


router.post(
  "/register",
  register
);


router.post(
  "/login",
  login
);


router.get(
  "/me",
  requireJWT,
  getMe
);


router.post(
  "/api-keys",
  requireJWT,
  createApiKey
);


router.get(
  "/api-keys",
  requireJWT,
  getApiKeys
);


export default router;