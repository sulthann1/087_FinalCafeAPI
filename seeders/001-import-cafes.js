import {
  fetchJogjaCafes
} from "../services/osmService.js";

import {
  Cafe
} from "../models/index.js";


function tag(
  tags,
  key
) {

  return tags?.[key] || null;

}


function coordinates(
  element
) {

  return {

    latitude:
      element.lat ??
      element.center?.lat,

    longitude:
      element.lon ??
      element.center?.lon

  };

}


function address(
  tags
) {

  return [

    tag(
      tags,
      "addr:housenumber"
    ),

    tag(
      tags,
      "addr:street"
    ),

    tag(
      tags,
      "addr:neighbourhood"
    )

  ]
    .filter(Boolean)
    .join(" ") || null;

}


function district(
  tags
) {

  return (

    tag(
      tags,
      "addr:suburb"
    )

    ||

    tag(
      tags,
      "addr:city_district"
    )

    ||

    tag(
      tags,
      "addr:district"
    )

    ||

    null

  );

}


export async function up() {

  console.log(
    "Fetching data from OpenStreetMap..."
  );


  const data =
    await fetchJogjaCafes();


  const cafes =
    data.elements
      .map(
        element => {

          const tags =
            element.tags || {};


          const coords =
            coordinates(
              element
            );


          return {

            osmId:
              element.id,

            osmType:
              element.type,

            name:
              tag(
                tags,
                "name"
              ),

            address:
              address(
                tags
              ),

            city:
              "Yogyakarta",

            district:
              district(
                tags
              ),

            latitude:
              coords.latitude,

            longitude:
              coords.longitude,

            phone:
              tag(
                tags,
                "phone"
              ) ||
              tag(
                tags,
                "contact:phone"
              ),

            website:
              tag(
                tags,
                "website"
              ) ||
              tag(
                tags,
                "contact:website"
              ),

            openingHours:
              tag(
                tags,
                "opening_hours"
              ),

            cuisine:
              tag(
                tags,
                "cuisine"
              ),

            wheelchair:
              tag(
                tags,
                "wheelchair"
              ),

            internet:
              tag(
                tags,
                "internet_access"
              ),

            outdoorSeating:
              tag(
                tags,
                "outdoor_seating"
              ),

            source:
              "OpenStreetMap",

            osmTimestamp:
              element.timestamp ||
              null

          };

        }
      )
      .filter(
        cafe =>
          cafe.name &&
          Number.isFinite(
            Number(
              cafe.latitude
            )
          ) &&
          Number.isFinite(
            Number(
              cafe.longitude
            )
          )
      );


  const unique =
    new Map();


  for (
    const cafe of cafes
  ) {

    unique.set(
      cafe.osmId,
      cafe
    );

  }


  const records =
    Array.from(
      unique.values()
    );


  console.log(
    `Found ${records.length} cafe records.`
  );


  await Cafe.bulkCreate(
    records,
    {
      updateOnDuplicate: [

        "name",
        "address",
        "district",
        "latitude",
        "longitude",
        "phone",
        "website",
        "openingHours",
        "cuisine",
        "wheelchair",
        "internet",
        "outdoorSeating",
        "osmTimestamp",
        "updatedAt"

      ]
    }
  );


  console.log(
    "Cafe data imported successfully."
  );

}


export async function down() {

  await Cafe.destroy({
    where: {},
    truncate: true
  });

}