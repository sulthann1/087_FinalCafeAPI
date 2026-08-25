import { Cafe } from "../models/index.js";

export async function getCafes(req, res) {
  try {
    const limit = Math.min(
      Number(req.query.limit) || 20,
      100
    );

    const offset =
      Math.max(
        Number(req.query.offset) || 0,
        0
      );

    const { rows, count } =
      await Cafe.findAndCountAll({
        limit,
        offset,

        order: [
          ["name", "ASC"]
        ],

        attributes: [
          "id",
          "osmId",
          "name",
          "address",
          "city",
          "district",
          "latitude",
          "longitude",
          "phone",
          "website",
          "openingHours",
          "cuisine",
          "wheelchair",
          "internet",
          "outdoorSeating"
        ]
      });

    return res.json({
      success: true,

      data: rows,

      pagination: {
        total: count,
        limit,
        offset,
        returned: rows.length
      }
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve cafe data"
    });
  }
}