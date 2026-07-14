import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// 👇 Force this API route to be dynamic
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!lat || !lon) {
      return NextResponse.json(
        { error: "Latitude and Longitude are required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenWeather API key is missing." },
        { status: 500 }
      );
    }

    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const { data } = await axios.get(url);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error getting pollution data:", error);

    return NextResponse.json(
      { error: "Error fetching pollution data." },
      { status: 500 }
    );
  }
}