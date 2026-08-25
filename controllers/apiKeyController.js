import crypto from "crypto";
import { ApiKey } from "../models/index.js";

export async function createApiKey(req, res) {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "API key name is required"
      });
    }

    const rawKey = `jca_${crypto.randomBytes(32).toString("hex")}`;
    
    // 1. Ambil 8 karakter pertama dari rawKey untuk dijadikan prefix
    const keyPrefix = rawKey.substring(0, 8); 

    const keyHash = crypto
      .createHash("sha256")
      .update(rawKey)
      .digest("hex");

    const apiKey = await ApiKey.create({
      userId: req.user.id,
      name,
      keyHash,
      keyPrefix, // 2. Tambahkan keyPrefix di sini
      isActive: true
    });

    return res.status(201).json({
      success: true,
      message: "API key created successfully",
      data: {
        id: apiKey.id,
        name: apiKey.name,
        apiKey: rawKey
      }
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create API key"
    });
  }
}

export async function listApiKeys(req, res) {
  try {
    const keys = await ApiKey.findAll({
      where: {
        userId: req.user.id
      },
      attributes: [
        "id",
        "name",
        "isActive",
        "createdAt"
      ],
      order: [
        ["createdAt", "DESC"]
      ]
    });

    return res.json({
      success: true,
      data: keys
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve API keys"
    });
  }
}