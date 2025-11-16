// we need to keep requests that use api key server sided for security reasons
// no error handling at this layer

"use server";

import { headers } from "next/headers";

async function getBaseUrl() {
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = headersList.get("x-forwarded-proto") || "http";
  return `${protocol}://${host}`;
}

export async function protectedFetch(url, options = {}) {
  const baseUrl = await getBaseUrl();
  const fullUrl = url.startsWith("/") ? `${baseUrl}${url}` : url;

  const defaultHeaders = {
    "x-api-key": process.env.ADMIN_API_KEY,
    "Content-Type": "application/json",
  };

  const mergedOptions = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  const response = await fetch(fullUrl, mergedOptions);
  return response.json();
}