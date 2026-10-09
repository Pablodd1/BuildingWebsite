import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req) {
    try {
        const body = await req.json();
        const { cart, shippingCost, customer, referenceId } = body;
        
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        
        if (!process.env.STRIPE_SECRET_KEY) {
            console.error('STRIPE_SECRET_KEY is not set');
            return NextResponse.json({ error: 'Payment gateway is not configured' }, { status: 500 });
        }

        const originUrl = req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

        const lineItems = [];
        
        cart.forEach(container => {
            container.items.forEach(item => {
                lineItems.push({
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `${item.name} (${container.name})`,
                            images: item.image ? [item.image.startsWith('http') ? item.image : `${originUrl}${item.image}`] : undefined,
                        },
                        unit_amount: Math.round((item.price || 0) * 100),
                    },
                    quantity: item.qty || 1,
                });
            });
        });

        if (shippingCost > 0) {
            lineItems.push({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'International Shipping & Handling',
                        description: `Shipping to ${customer?.city}, ${customer?.country}`,
                    },
                    unit_amount: Math.round(shippingCost * 100),
                },
                quantity: 1,
            });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            billing_address_collection: 'required',
            customer_email: customer?.email,
            line_items: lineItems,
            mode: 'payment',
            success_url: `${originUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&ref=${referenceId}`,
            cancel_url: `${originUrl}/checkout`,
            metadata: {
                referenceId,
                companyName: customer?.companyName,
                contactName: customer?.contactName,
            }
        });

        return NextResponse.json({ url: session.url });
    } catch (err) {
        console.error('Stripe checkout error:', err);
        return NextResponse.json({ error: err.message }, { status: err.statusCode || 500 });
    }
}
