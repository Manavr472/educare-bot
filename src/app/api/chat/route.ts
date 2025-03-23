import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    const response = await axios.post('http://localhost:8000/generate', { prompt });

    return NextResponse.json({ reply: response.data.reply });
  } catch (error) {
    console.error('Error calling backend:', error);
    return NextResponse.json({ reply: 'Error generating response' }, { status: 500 });
  }
}
