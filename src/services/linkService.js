import { getToken } from "../utils/auth";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "";

export async function getUserLinks() {
  const token = getToken();

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await fetch(`${API_BASE_URL}/api/links`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch links");
  }

  return data.results || [];
}

export async function deleteLink(linkId) {
  const token = getToken();

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await fetch(`${API_BASE_URL}/api/links/${linkId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete link");
  }

  return data;
}

export async function createLink(originalUrl, slug = "") {
  const token = getToken();

  if (!token) {
    throw new Error("No authentication token found");
  }

  const payload = {
    original_url: originalUrl,
  };

  if (slug.trim()) {
    payload.slug = slug.trim();
  }

  const response = await fetch(`${API_BASE_URL}/api/links`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create link");
  }

  return data.results;
}
