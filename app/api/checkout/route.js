import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { stripe } from "../../../lib/stripe";

// only handles prices >= 1.00 CAD
export async function POST(req) {
  try {
    const body = await req.json();
    const price = body.price;

    const headersList = await headers();
    const origin = headersList.get("origin");

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "cad",
            product_data: {
              name: "test",
            },
            unit_amount: price, // Dynamic amount from request
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      // add session id stuff later
      success_url: `${origin}/checkout-success`,
      cancel_url: `${origin}/checkout-cancelled`,
      metadata: {
        price: price,
        delivery_method: body.delivery_method,
      },
    });

    return NextResponse.json({ redirectUrl: session.url });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}
