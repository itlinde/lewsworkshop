import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { createOrder } from "../../../lib/orderUtils";

import { stripe } from "../../../lib/stripe";

// only handles prices >= 1.00 CAD
export async function POST(req) {
  try {
    const body = await req.json();
    const price = body.price;

    if (price < 100) {
      return NextResponse.json(
        { error: "Price must be >= 1.00 CAD" },
        { status: 400 }
      );
    }

    if (body.beads.length === 0) {
      return NextResponse.json(
        { error: "Must have at least one bead" },
        { status: 400 }
      );
    }

    const orderRes = await createOrder({
      price: price,
      address: "test",
      status: "pending",
      beads: body.beads,
    });

    const orderId = orderRes.orderData.id;

    const headersList = await headers();
    const origin = headersList.get("origin");

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "cad",
            product_data: {
              name: "Lewlery keychain!",
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      // add session id stuff later
      // wtf is session id
      success_url: `${origin}/checkout-success`,
      cancel_url: `${origin}/checkout-cancelled`,
      metadata: {
        price: price,
        delivery_method: body.delivery_method,
        pending_order_id: orderId,
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
