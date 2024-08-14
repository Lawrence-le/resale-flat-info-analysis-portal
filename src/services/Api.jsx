// export async function get() {
//   const datasetId = "d_8b84c4ee58e3cfc0ece0d773c8ca6abc";
//   const url = `https://data.gov.sg/api/action/datastore_search?resource_id=${datasetId}&limit=10`;

//   try {
//     const response = await fetch(url, {});
//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`);
//     }

//     const json = await response.json();

//     const totalRecords = json.result.total;

//     return totalRecords;
//   } catch (error) {
//     console.error(error.message);
//     return 0;
//   }
// }

//Api.jsx

export async function getHdb(getYear) {
  // console.log("getHDB YEAR: ", getYear);
  const datasetId = "d_8b84c4ee58e3cfc0ece0d773c8ca6abc";
  const url = `https://data.gov.sg/api/action/datastore_search?resource_id=${datasetId}&sort=month desc&limit=12000&q={"month":"${getYear}"}`;

  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    return data.result.records;
  } catch (error) {
    console.error(error.message);
    return [];
  }
}

//Api.jsx
export async function getHdbFilteredPreviousMonth(previousMonthString) {
  const datasetId = "d_8b84c4ee58e3cfc0ece0d773c8ca6abc";
  const url = `https://data.gov.sg/api/action/datastore_search?resource_id=${datasetId}&sort=month desc&q={"month":"${previousMonthString}"}&limit=12000`;

  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    // console.log("GET Response Data:", data);
    return data.result.records;
  } catch (error) {
    console.error(error.message);
    return [];
  }
}

//Api.jsx
export async function getHdbFilteredTown(getTown, getFlatType, getYear) {
  const datasetId = "d_8b84c4ee58e3cfc0ece0d773c8ca6abc";
  // console.log("getHdbFilteredTown Town: ", getTown);
  // console.log("getHdbFilteredTown Flat Type: ", getFlatType);
  // console.log("getHdbFilteredTown Year: ", getYear);

  const url = `https://data.gov.sg/api/action/datastore_search?resource_id=${datasetId}&sort=month desc&limit=12000&q={"town":"${getTown}","flat_type":"${getFlatType}","month":"${getYear}"}`;

  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();

    return data.result.records;
  } catch (error) {
    console.error(error.message);
    return [];
  }
}
