import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const body = await req.json();
        const WALIO_API_KEY = process.env.WALIO_API_KEY;

        if (!WALIO_API_KEY) {
            console.error('WALIO_API_KEY is not set');
            console.warn('Fallback: Shipping API not configured, using mock data');
            return NextResponse.json({
                totalPrice: 1500,
                transitTime: '14-21 Business Days',
                mocked: true
            });
        }

        const response = await fetch('https://walio.ai/api/v1/rates/fcl', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${WALIO_API_KEY}`
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Walio API Error:', response.status, errorText);
            console.warn('Fallback: Walio API failed, using mock data');
            return NextResponse.json({
                totalPrice: 1500,
                transitTime: '14-21 Business Days',
                mocked: true,
                originalError: errorText
            });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Shipping quote error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
