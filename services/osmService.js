import "dotenv/config";

const OVERPASS_SERVERS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
  "https://overpass.private.coffee/api/interpreter"
];

const QUERY = `
[out:json][timeout:180];

area
  ["name"="Kota Yogyakarta"]
  ["boundary"="administrative"]
  ->.searchArea;

(
  nwr
    ["amenity"="cafe"]
    (area.searchArea);

  nwr
    ["shop"="coffee"]
    (area.searchArea);
);

out center tags;
`;


async function requestOverpass(
  server,
  timeout = 210000
) {

  const controller =
    new AbortController();

  const timer =
    setTimeout(
      () => controller.abort(),
      timeout
    );

  try {

    console.log(
      `Requesting Overpass: ${server}`
    );

    const response =
      await fetch(
        server,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",

            "User-Agent":
              "JogjaCafeDataSaaS/1.0"
          },

          body:
            new URLSearchParams({
              data: QUERY
            }),

          signal:
            controller.signal
        }
      );


    if (!response.ok) {

      throw new Error(
        `Overpass API returned ${response.status}`
      );

    }


    return await response.json();

  } finally {

    clearTimeout(timer);

  }

}


export async function fetchJogjaCafes() {

  let lastError = null;


  for (
    const server of OVERPASS_SERVERS
  ) {

    for (
      let attempt = 1;
      attempt <= 2;
      attempt++
    ) {

      try {

        console.log(
          `Attempt ${attempt}/2`
        );


        const data =
          await requestOverpass(
            server
          );


        if (
          !data.elements ||
          data.elements.length === 0
        ) {

          throw new Error(
            "Overpass returned no cafe data"
          );

        }


        console.log(
          `Received ${data.elements.length} OSM objects`
        );


        return data;

      } catch (error) {

        lastError = error;


        console.error(
          `Overpass failed: ${error.message}`
        );


        if (
          attempt < 2
        ) {

          console.log(
            "Retrying in 3 seconds..."
          );


          await new Promise(
            resolve =>
              setTimeout(
                resolve,
                3000
              )
          );

        }

      }

    }

  }


  throw new Error(
    `All Overpass servers failed. Last error: ${lastError?.message}`
  );

}