import {
  ApiKey,
  ApiUsageLog
} from "../models/index.js";

import {
  hashApiKey
} from "../utils/auth.js";


export async function requireApiKey(
  req,
  res,
  next
) {

  try {

    const apiKey =
      req.headers["x-api-key"];


    if (!apiKey) {

      return res.status(401).json({
        error:
          "x-api-key header is required"
      });

    }


    const keyHash =
      hashApiKey(apiKey);


    const key =
      await ApiKey.findOne({

        where: {
          keyHash
        }

      });


    if (!key) {

      return res.status(401).json({
        error:
          "Invalid API key"
      });

    }


    key.lastUsedAt =
      new Date();

    await key.save();


    req.apiKey =
      key;


    res.on(
      "finish",
      async () => {

        try {

          await ApiUsageLog.create({

            apiKeyId:
              key.id,

            endpoint:
              req.originalUrl,

            method:
              req.method,

            statusCode:
              res.statusCode

          });

        } catch (error) {

          console.error(
            "API log error:",
            error.message
          );

        }

      }
    );


    next();

  } catch (error) {

    console.error(error);


    res.status(500).json({
      error:
        "API authentication failed"
    });

  }

}