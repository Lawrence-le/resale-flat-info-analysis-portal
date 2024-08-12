const API_KEY = import.meta.env.VITE_AIR_TABLE_TOKEN;
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${API_KEY}`,
};

export const addSelection = async (townKey, flatTypeKey) => {
  const airtable_town_url =
    "https://api.airtable.com/v0/appwCopPSRNE5cJQe/Table%201";
  const payload = {
    fields: {
      town: townKey,
      flatType: flatTypeKey,
    },
  };

  console.log("formData:", { townKey, flatTypeKey });
  console.log("payload:", payload);

  try {
    const response = await fetch(airtable_town_url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers,
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    const result = { id: json.id, ...json.fields };
    // console.log("result:", result);
    return result;
  } catch (error) {
    console.error("Error:", error.message);
  }
};

export const fetchExistingData = async () => {
  const airtable_town_url =
    "https://api.airtable.com/v0/appwCopPSRNE5cJQe/Table%201";

  try {
    const response = await fetch(airtable_town_url, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json.records.map((record) => {
      return {
        id: record.id,
        ...record.fields,
      };
    });
  } catch (error) {
    console.error(error.message);
  }
};

export const deleteAllRecords = async () => {
  const airtable_town_url =
    "https://api.airtable.com/v0/appwCopPSRNE5cJQe/Table%201";

  try {
    const existingData = await fetchExistingData();
    for (const record of existingData) {
      const response = await fetch(`${airtable_town_url}/${record.id}`, {
        method: "DELETE",
        headers,
      });
      if (!response.ok) {
        throw new Error(`Failed to delete record with ID ${record.id}`);
      }
    }
    // console.log("Record deleted successfully");
  } catch (error) {
    console.error("Error deleting records:", error.message);
  }
};
