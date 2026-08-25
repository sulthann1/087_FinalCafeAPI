import {
  Op
} from "sequelize";

import {
  Cafe
} from "../models/index.js";


// GET CAFES

export async function getCafes(
  req,
  res
) {

  try {

    const {
      q,
      district,
      cuisine,
      limit = 20,
      offset = 0
    } = req.query;


    const where = {};


    if (q) {

      where[
        Op.or
      ] = [

        {
          name: {
            [Op.iLike]:
              `%${q}%`
          }
        },

        {
          address: {
            [Op.iLike]:
              `%${q}%`
          }
        }

      ];

    }


    if (district) {

      where.district = {
        [Op.iLike]:
          `%${district}%`
      };

    }


    if (cuisine) {

      where.cuisine = {
        [Op.iLike]:
          `%${cuisine}%`
      };

    }


    const safeLimit =
      Math.min(
        Math.max(
          Number(limit) || 20,
          1
        ),
        100
      );


    const safeOffset =
      Math.max(
        Number(offset) || 0,
        0
      );


    const result =
      await Cafe.findAndCountAll({

        where,

        order: [
          [
            "name",
            "ASC"
          ]
        ],

        limit:
          safeLimit,

        offset:
          safeOffset

      });


    res.json({

      data:
        result.rows,

      pagination: {

        total:
          result.count,

        limit:
          safeLimit,

        offset:
          safeOffset,

        returned:
          result.rows.length

      }

    });

  } catch (error) {

    console.error(error);


    res.status(500).json({
      error:
        "Failed to retrieve cafes"
    });

  }

}


// GET ONE

export async function getCafeById(
  req,
  res
) {

  try {

    const cafe =
      await Cafe.findByPk(
        req.params.id
      );


    if (!cafe) {

      return res.status(404).json({
        error:
          "Cafe not found"
      });

    }


    res.json(cafe);

  } catch (error) {

    console.error(error);


    res.status(500).json({
      error:
        "Failed to retrieve cafe"
    });

  }

}


// STATISTICS

export async function getCafeStats(
  req,
  res
) {

  try {

    const total =
      await Cafe.count();


    const withWebsite =
      await Cafe.count({

        where: {
          website: {
            [Op.ne]:
              null
          }
        }

      });


    const withPhone =
      await Cafe.count({

        where: {
          phone: {
            [Op.ne]:
              null
          }
        }

      });


    const withOpeningHours =
      await Cafe.count({

        where: {
          openingHours: {
            [Op.ne]:
              null
          }
        }

      });


    const districts =
      await Cafe.count({

        distinct:
          true,

        col:
          "district"

      });


    res.json({

      total_cafes:
        total,

      districts,

      with_website:
        withWebsite,

      with_phone:
        withPhone,

      with_opening_hours:
        withOpeningHours

    });

  } catch (error) {

    console.error(error);


    res.status(500).json({
      error:
        "Failed to retrieve statistics"
    });

  }

}