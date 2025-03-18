// app/api/webhooks/stripe/route.js
import { NextResponse } from "next/server";
import { stripe } from "../../../../lib/stripe";
import { createCustomer } from "../../../../lib/customerUtils";
import { updateOrder } from "../../../../lib/orderUtils";

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

    const metadata = session.metadata;

    const orderRes = await updateOrder(metadata.pending_order_id, {
      status: "processing",
      delivery_method: "test",
      customer_id: customerId,
      country: session.customer_details.address.country,
      postal_code: session.customer_details.address.postal_code,
    });

    if (orderRes.ok) {
      return NextResponse.json(orderRes.orderData);
    } else {
      return NextResponse.json({ error: orderRes.error }, { status: 400 });
    }
  }

  return NextResponse.json({ received: true });
}
