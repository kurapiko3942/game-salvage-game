import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const clientId = process.env.IGDB_CLIENT_ID;
    const accessToken = process.env.IGDB_ACCESS_TOKEN;

    if (!clientId || !accessToken) {
      console.error("Missing IGDB_CLIENT_ID or IGDB_ACCESS_TOKEN");
      throw new Error("Missing IGDB_CLIENT_ID or IGDB_ACCESS_TOKEN");
    }

    // ランダムなオフセットを生成
    const offset = Math.floor(Math.random() * 1000);

    const response = await fetch("https://api.igdb.com/v4/games", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Client-ID': clientId,
        'Authorization': `Bearer ${accessToken}`,
      },
      body: `fields name,screenshots.url,first_release_date,involved_companies.company.name; limit 5; offset ${offset};`,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch data from IGDB: ${errorText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error('Error fetching data from IGDB:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  }
}
