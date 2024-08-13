// Add query from API

export async function get() {
  const datasetId = "d_8b84c4ee58e3cfc0ece0d773c8ca6abc";
  const url = `https://data.gov.sg/api/action/datastore_search?resource_id=${datasetId}&limit=10`;

  try {
    const response = await fetch(url, {});
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    const totalRecords = json.result.total;

    return totalRecords;
  } catch (error) {
    console.error(error.message);
    return 0;
  }
}

export async function getHdb() {
  const totalRecords = await get();
  // console.log(totalRecords);
  const offSet = totalRecords - 14000;
  // console.log(offSet);

  const datasetId = "d_8b84c4ee58e3cfc0ece0d773c8ca6abc";

  const url = `https://data.gov.sg/api/action/datastore_search?resource_id=${datasetId}&offset=${offSet}&limit=14000`;

  try {
    const response = await fetch(url, {});
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    // console.log("getHdb Data:", json.result.records);
    return json.result.records;
  } catch (error) {
    console.error(error.message);
    return [];
  }
}

export async function getHdbFiltered() {
  const totalRecords = await get();
  console.log("Total Records: ", totalRecords);
  const offSet = totalRecords - 14000;
  // console.log(offSet);

  const datasetId = "d_8b84c4ee58e3cfc0ece0d773c8ca6abc";

  const payload = { town: "BISHAN", flat_type: "5 ROOM" };

  const url = `https://data.gov.sg/api/action/datastore_search?resource_id=${datasetId}&offset=${offSet}&limit=14000&filter={${payload}}`;

  try {
    const response = await fetch(url, {});
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log("getHdbFiltered:", json.result.records);
    return json.result.records;
  } catch (error) {
    console.error(error.message);
    return [];
  }
}
