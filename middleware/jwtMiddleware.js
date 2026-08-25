import jwt from "jsonwebtoken";


export function requireJWT(
  req,
  res,
  next
) {

  const authorization =
    req.headers.authorization;


  if (!authorization) {

    return res.status(401).json({
      error:
        "Authorization header is required"
    });

  }


  const [
    scheme,
    token
  ] =
    authorization.split(" ");


  if (
    scheme !== "Bearer" ||
    !token
  ) {

    return res.status(401).json({
      error:
        "Bearer token is required"
    });

  }


  try {

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );


    req.user =
      decoded;


    next();

  } catch {

    return res.status(401).json({
      error:
        "Invalid or expired token"
    });

  }

}