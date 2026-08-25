import crypto from "crypto";
import jwt from "jsonwebtoken";


export function generateToken(
  user
) {

  return jwt.sign(

    {
      sub:
        user.id,

      email:
        user.email,

      name:
        user.name
    },

    process.env.JWT_SECRET,

    {
      expiresIn:
        "2h"
    }

  );

}


export function generateApiKey() {

  return (
    "jca_" +
    crypto
      .randomBytes(32)
      .toString("hex")
  );

}


export function hashApiKey(
  apiKey
) {

  return crypto
    .createHash("sha256")
    .update(apiKey)
    .digest("hex");

}