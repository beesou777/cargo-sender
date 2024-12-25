import { baseUrl } from "@/utils/constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { countryCode: string } }
) {
  try {
    const countryCode = params.countryCode;
    if (!countryCode) throw new Error("Failed to fetch data");
    const url = `${baseUrl}/countries/${countryCode}/regions`;
    const response = await fetch(url, {
      headers: {
        "x-api-key": process.env.EURO_SENDER_API_KEY!,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message! }, { status: 500 });
  }
}
