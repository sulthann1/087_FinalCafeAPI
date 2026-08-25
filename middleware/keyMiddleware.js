import crypto from "crypto";
import { ApiKey } from "../models/index.js";

export async function authenticateApiKey(req, res, next) {
  try {
    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
      return res.status(401).json({
        success: false,
        message: "X-API-Key header is required"
      });
    }

    const keyHash = crypto
      .createHash("sha256")
      .update(apiKey)
      .digest("hex");

    const keyRecord = await ApiKey.findOne({
      where: {
        keyHash,
      }
    });

    if (!keyRecord) {
      return res.status(401).json({
        success: false,
        message: "Invalid API key"
      });
    }

    req.apiKey = keyRecord;

    next();

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "API key authentication failed"
    });
  }
}