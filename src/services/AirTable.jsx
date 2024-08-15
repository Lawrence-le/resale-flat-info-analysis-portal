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
    console.error("Error in addSelection:", error.message);
    return [];
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
    console.error("fetchExistingData:", error.message);
    return [];
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
    console.error("deleteAllRecords:", error.message);
    return [];
  }
};

//* For Bookmarks

export const addBookmarks = async () => {
  const url =
    "https://api.airtable.com/v0/appFKfNxO9GBOaz7B/Table%201?view=Grid%20view";

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

    // console.log("Mapped Payload:", payload);

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
    console.error("addBookmarks:", error.message);
    return [];
  }
};
export const fetchBookmarkedTowns = async () => {
  // const url = "https://api.airtable.com/v0/appFKfNxO9GBOaz7B/Table%201";
  const url =
    "https://api.airtable.com/v0/appFKfNxO9GBOaz7B/Table%201?view=Grid%20view";
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
    console.error(error.message);
    return [];
  }
};

export const deleteAllBookmarks = async () => {
  try {
    const url = "https://api.airtable.com/v0/appFKfNxO9GBOaz7B/Table%201";
    const existingData = await fetchBookmarkedTowns();

    for (let i = 0; i < existingData.length; i++) {
      const record = existingData[i];
      const response = await fetch(`${url}/${record.id}`, {
        method: "DELETE",
        headers,
      });

      if (!response.ok) {
        throw new Error(
          `Failed to delete record with ID ${record.id}. Status: ${response.status}`
        );
      }
    }
  } catch (error) {
    console.error("Error deleting records:", error.message);
    return [];
  }
};

export const deleteBookmark = async (selectedBookmarkId) => {
  try {
    const url = "https://api.airtable.com/v0/appFKfNxO9GBOaz7B/Table%201";

    const response = await fetch(`${url}/${selectedBookmarkId}`, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to delete record with ID ${selectedBookmarkId}`);
    }

    return true;
  } catch (error) {
    console.error(error.message);
    return [];
  }
};
