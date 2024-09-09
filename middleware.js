import { NextResponse } from "next/server";
import axios from "axios";

// Custom CORS Handling
function handleCors(req) {
  const origin = req.headers.get("origin");
  const allowedOrigins = ["http://localhost:3000"];

  if (allowedOrigins.includes(origin || "")) {
    const response = NextResponse.next();
    response.headers.set("Access-Control-Allow-Credentials", "true");
    response.headers.set("Access-Control-Allow-Origin", origin || "*");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE,OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type,Authorization"
    );

    // Handle preflight requests
    if (req.method === "OPTIONS") {
      response.headers.set("Access-Control-Max-Age", "86400"); // Cache preflight request for 24 hours
      return new NextResponse(null, { status: 204 });
    }
    return response;
  }
  return null;
}

// Helper function to fetch data from the Directus API
async function fetchData(url) {
  try {
    const response = await axios.get(url);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data from Directus API" },
      { status: 500 }
    );
  }
}

// Handler function to map paths to API URLs
function handleApiRequest(pathname) {
  // Extract dynamic segments for /api/trip/:slug
  const tripMatch = pathname.match(/^\/api\/trip\/([^\/]+)$/);
  const tripSlug = tripMatch ? tripMatch[1] : null;

  // Extract dynamic segments for /api/trips/images/:id
  const imageMatch = pathname.match(/^\/api\/trip\/images\/([^\/]+)$/);
  const imageId = imageMatch ? imageMatch[1] : null;

  // Extract dynamic segments for /api/trip/options/:id
  const optionsMatch = pathname.match(/^\/api\/trip\/options\/([^\/]+)$/);
  const optionId = optionsMatch ? optionsMatch[1] : null;

  // Extract dynamic segments for /api/trip/options/:id
  const optionRelation = pathname.match(
    /^\/api\/trip\/optionsRelation\/([^\/]+)$/
  );
  const parent_option_id = optionRelation ? optionRelation[1] : null;

  // Define dynamic URL mapping for trips
  if (tripSlug) {
    return `http://75.119.130.218:8055/items/trips/?filter={ "slug": { "_eq": "${tripSlug}" }}`;
  }

  // Define dynamic URL mapping for trip images
  if (imageId) {
    return `http://75.119.130.218:8055/items/trip_images/?filter={ "trip_id": { "_eq": "${imageId}" }}`;
  }

  // Define dynamic URL mapping for trip options
  if (optionId) {
    return `http://75.119.130.218:8055/items/trip_options/?filter={ "trip_id": { "_eq": "${optionId}" }}`;
  }

  if (parent_option_id) {
    return `http://75.119.130.218:8055/items/option_relation/?filter={ "parent_option_id": { "_eq": "${parent_option_id}" }}`;
  }

  // Fallback for other paths
  return null;
}

// Middleware function
export async function middleware(req) {
  // Run the custom CORS handling
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  // Handle API requests
  const apiUrl = handleApiRequest(req.nextUrl.pathname);
  if (apiUrl) {
    return fetchData(apiUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
