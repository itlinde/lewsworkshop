// app/api/webhooks/stripe/route.js
import { NextResponse } from "next/server";
import { stripe } from "../../../../lib/stripe";
import { createOrder } from "../../../../lib/orderUtils";
import { createCustomer } from "../../../../lib/customerUtils";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    console.error("Full error:", err);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const customerRes = await createCustomer({
      name: session.customer_details.name,
      email: session.customer_details.email,
    });
    const customerId = customerRes.id;

    await createOrder({
      postal_code: session.customer_details.address.postal_code || "test",
      country: session.customer_details.address.country || "test",
      customer_id: customerId,
      delivery_method: session.metadata.delivery_method,
      price: session.metadata.price,
      address: session.customer_details.address.line1 || "test",
      status: "pending",
    });
  }

  return NextResponse.json({ received: true });
}
