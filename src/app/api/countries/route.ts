import { baseUrl } from '@/utils/constants';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(`${baseUrl}/countries`, {
      headers: {
        'x-api-key': process.env.EURO_SENDER_API_KEY!,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message! }, { status: 500 });
  }
}
