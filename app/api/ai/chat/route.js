import { NextResponse } from 'next/server';

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(req) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const { model = 'gemini-2.5-flash', contents = [], config = {}, isStream = false } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || process.env.VITE_GEMINI_API_KEY || process.env.VITE_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "Gemini API credentials not configured on the server." }, { status: 500, headers });
    }

    const action = isStream ? 'streamGenerateContent' : 'generateContent';
    const targetUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:${action}?key=${apiKey}`;

    const payload = {
      contents,
      generationConfig: config.generationConfig || {},
      systemInstruction: config.systemInstruction ? {
        parts: [{ text: config.systemInstruction }]
      } : undefined,
      tools: config.tools || undefined
    };

    const apiRes = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!apiRes.ok) {
      const errText = await apiRes.text();
      return NextResponse.json({ error: `Gemini API reported error: ${errText}` }, { status: apiRes.status, headers });
    }

    // If it's a stream, we pipe the readable stream directly
    if (isStream) {
      return new Response(apiRes.body, {
        headers: {
          ...headers,
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive'
        }
      });
    }

    const json = await apiRes.json();
    return new Response(JSON.stringify(json), {
      status: 200,
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      }
    });
  } catch (err) {
    console.error("AI Proxy Route Failure:", err);
    return NextResponse.json({ error: String(err) }, { status: 500, headers });
  }
}
