import express from "express";

import {
  createApiKey,
  listApiKeys
} from "../controllers/apiKeyController.js";

import {
  authenticateJWT
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authenticateJWT);

router.post("/", createApiKey);
router.get("/", listApiKeys);

export default router;