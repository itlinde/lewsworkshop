import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { createDraftOrder, updateOrder } from "../../../lib/orderUtils";

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

    const orderRes = await createDraftOrder({
      price: price,
      address: "test",
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
            // im not sure why i blatantly lied to isabella about stripe storing price as cents but we need to do this to get price in dollars
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/checkout-success`,
      cancel_url: `${origin}/checkout-cancelled`,
      metadata: {
        price: price,
        pending_order_id: orderId,
      },
    });

    await updateOrder(orderId, {
      session_id: session.id,
    });

    return NextResponse.json({ redirectUrl: session.url });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}
