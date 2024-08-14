const API_KEY = import.meta.env.VITE_AIR_TABLE_TOKEN;
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${API_KEY}`,
};

export const addSelection = async (townKey, flatTypeKey) => {
  const url = "https://api.airtable.com/v0/appwCopPSRNE5cJQe/Table%201";
  const payload = {
    fields: {
      town: townKey,
      flatType: flatTypeKey,
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers,
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    const result = { id: json.id, ...json.fields };
    return result;
  } catch (error) {
    console.error("Error:", error.message);
  }
};

export const fetchExistingData = async () => {
  const url = "https://api.airtable.com/v0/appwCopPSRNE5cJQe/Table%201";

  try {
    const response = await fetch(url, {
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
  const url = "https://api.airtable.com/v0/appwCopPSRNE5cJQe/Table%201";

  try {
    const existingData = await fetchExistingData();
    for (const record of existingData) {
      const response = await fetch(`${url}/${record.id}`, {
        method: "DELETE",
        headers,
      });
      if (!response.ok) {
        throw new Error(`Failed to delete record with ID ${record.id}`);
      }
    }
  } catch (error) {
    console.error("Error deleting records:", error.message);
  }
};

//* For Bookmarks

export const addBookmarks = async () => {
  const url = "https://api.airtable.com/v0/appFKfNxO9GBOaz7B/Table%201";

  try {
    const existingData = await fetchExistingData();

    if (!existingData || existingData.length === 0) {
      throw new Error("No existing data found to map the payload.");
    }
    const { town, flatType } = existingData[0];

    const payload = {
      fields: {
        town,
        flatType,
      },
    };

    console.log("Mapped Payload:", payload);

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers,
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    const result = { id: json.id, ...json.fields };
    return result;
  } catch (error) {
    console.error("Error:", error.message);
  }
};
export const fetchBookmarkedTowns = async () => {
  const url = "https://api.airtable.com/v0/appFKfNxO9GBOaz7B/Table%201";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json.records.map((record) => ({
      id: record.id,
      ...record.fields,
    }));
  } catch (error) {
    console.error("Error fetching favorite towns:", error.message);
    return [];
  }
};

export const deleteAllBookmarks = async () => {
  try {
    const url = "https://api.airtable.com/v0/appFKfNxO9GBOaz7B/Table%201";
    const existingData = await fetchBookmarkedTowns();
    for (const record of existingData) {
      const response = await fetch(`${url}/${record.id}`, {
        method: "DELETE",
        headers,
      });
      if (!response.ok) {
        throw new Error(`Failed to delete record with ID ${record.id}`);
      }
    }
  } catch (error) {
    console.error("Error deleting records:", error.message);
  }
};
