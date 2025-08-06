import { createClient } from "../../../utils/supabase/server";
import { NextResponse } from "next/server";
import { createOrder } from "../../../lib/orderUtils";

// fetch all order data
export async function GET(req) {
  console.log("GET /api/orders - Fetching all orders");
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("orders").select().order('id', {ascending: true});

    return NextResponse.json(data);
  } catch (error) {
    console.error("GET /api/orders - Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// request to add a new order
export async function POST(req) {
  console.log("POST /api/orders - Creating new order");
  const body = await req.json();
  console.log("POST /api/orders - Request body:", body);

  const orderRes = await createOrder(body);

  if (orderRes.ok) {
    console.log(
      "POST /api/orders - Order created successfully:",
      orderRes.orderData
    );
    return NextResponse.json(orderRes.orderData);
  } else {
    console.error("POST /api/orders - Error creating order:", orderRes.error);
    return NextResponse.json({ error: orderRes.error }, { status: 400 });
  }
}
