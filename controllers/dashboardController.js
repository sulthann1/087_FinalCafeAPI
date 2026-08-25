import {
  Cafe,
  ApiKey,
  ApiUsageLog
} from "../models/index.js";


export async function getDashboardStats(
  req,
  res
) {

  try {

    const cafeCount =
      await Cafe.count();


    const apiKeyCount =
      await ApiKey.count({

        where: {
          userId:
            req.user.sub
        }

      });


    const apiRequestCount =
      await ApiUsageLog.count({

        include: [

          {
            model:
              ApiKey,

            as:
              "apiKey",

            where: {
              userId:
                req.user.sub
            }

          }

        ]

      });


    res.json({

      cafes:
        cafeCount,

      api_keys:
        apiKeyCount,

      api_requests:
        apiRequestCount

    });

  } catch (error) {

    console.error(error);


    res.status(500).json({
      error:
        "Failed to retrieve dashboard statistics"
    });

  }

}