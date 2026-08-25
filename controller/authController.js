import bcrypt from "bcryptjs";

import {
  User,
  ApiKey
} from "../models/index.js";

import {
  generateToken,
  generateApiKey,
  hashApiKey
} from "../utils/auth.js";


// REGISTER

export async function register(
  req,
  res
) {

  try {

    const {
      name,
      email,
      password
    } = req.body;


    if (
      !name ||
      !email ||
      !password
    ) {

      return res.status(400).json({
        error:
          "name, email and password are required"
      });

    }


    if (
      password.length < 6
    ) {

      return res.status(400).json({
        error:
          "Password must be at least 6 characters"
      });

    }


    const existing =
      await User.findOne({

        where: {
          email:
            email.toLowerCase()
        }

      });


    if (existing) {

      return res.status(409).json({
        error:
          "Email already registered"
      });

    }


    const passwordHash =
      await bcrypt.hash(
        password,
        12
      );


    const user =
      await User.create({

        name,

        email:
          email.toLowerCase(),

        passwordHash

      });


    const token =
      generateToken(user);


    res.status(201).json({

      message:
        "Registration successful",

      user: {

        id:
          user.id,

        name:
          user.name,

        email:
          user.email

      },

      token

    });

  } catch (error) {

    console.error(error);


    res.status(500).json({
      error:
        "Registration failed"
    });

  }

}


// LOGIN

export async function login(
  req,
  res
) {

  try {

    const {
      email,
      password
    } = req.body;


    const user =
      await User.findOne({

        where: {
          email:
            email.toLowerCase()
        }

      });


    if (!user) {

      return res.status(401).json({
        error:
          "Invalid email or password"
      });

    }


    const valid =
      await bcrypt.compare(
        password,
        user.passwordHash
      );


    if (!valid) {

      return res.status(401).json({
        error:
          "Invalid email or password"
      });

    }


    const token =
      generateToken(user);


    res.json({

      message:
        "Login successful",

      user: {

        id:
          user.id,

        name:
          user.name,

        email:
          user.email

      },

      token

    });

  } catch (error) {

    console.error(error);


    res.status(500).json({
      error:
        "Login failed"
    });

  }

}


// ME

export async function getMe(
  req,
  res
) {

  const user =
    await User.findByPk(
      req.user.sub,
      {
        attributes: [
          "id",
          "name",
          "email",
          "createdAt"
        ]
      }
    );


  if (!user) {

    return res.status(404).json({
      error:
        "User not found"
    });

  }


  res.json(user);

}


// CREATE API KEY

export async function createApiKey(
  req,
  res
) {

  try {

    const name =
      req.body.name ||
      "My Application";


    const rawKey =
      generateApiKey();


    const keyHash =
      hashApiKey(rawKey);


    const keyPrefix =
      rawKey.substring(
        0,
        12
      );


    const key =
      await ApiKey.create({

        userId:
          req.user.sub,

        name,

        keyHash,

        keyPrefix

      });


    res.status(201).json({

      id:
        key.id,

      name:
        key.name,

      key_prefix:
        key.keyPrefix,

      api_key:
        rawKey,

      warning:
        "Save this API key. It cannot be recovered later."

    });

  } catch (error) {

    console.error(error);


    res.status(500).json({
      error:
        "Failed to create API key"
    });

  }

}


// GET API KEYS

export async function getApiKeys(
  req,
  res
) {

  const keys =
    await ApiKey.findAll({

      where: {
        userId:
          req.user.sub
      },

      attributes: [
        "id",
        "name",
        "keyPrefix",
        "lastUsedAt",
        "createdAt"
      ],

      order: [
        [
          "createdAt",
          "DESC"
        ]
      ]

    });


  res.json(keys);

}