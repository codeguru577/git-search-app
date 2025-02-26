// apiService.js

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Function to send data using POST request
export const postData = async (endpoint, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST", // HTTP method
      headers: {
        "Content-Type": "application/json", // Set content type to JSON
      },
      body: JSON.stringify(data), // Convert data to JSON format
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const responseData = await response.json(); // Parse JSON response
    return responseData;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};
