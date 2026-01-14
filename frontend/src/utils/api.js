export const getApiUrl = (path) => {
  const baseUrl = (
    import.meta.env.VITE_API_URL || "http://localhost:5000/api"
  ).replace(/\/$/, "");

  // Ensure the base URL includes /api if it doesn't already
  const urlWithApi = baseUrl.endsWith("/api") ? baseUrl : `${baseUrl}/api`;

  // Ensure path starts with /
  const sanitizedPath = path.startsWith("/") ? path : `/${path}`;

  // Combine and ensure protocol
  let finalUrl = `${urlWithApi}${sanitizedPath}`;

  if (!finalUrl.startsWith("http://") && !finalUrl.startsWith("https://")) {
    finalUrl = `https://${finalUrl}`;
  }

  return finalUrl;
};
