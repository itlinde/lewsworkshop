import { createClient } from "../../../utils/supabase/server";
import { NextResponse } from "next/server";
import { createOrder } from "../../../lib/orderUtils";

// fetch all order data
export async function GET(req) {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("orders").select().order('id', {ascending: true});

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// request to add a new order
export async function POST(req) {
  const body = await req.json();
  const orderRes = await createOrder(body);

  if (orderRes.ok) {
    return NextResponse.json(orderRes.orderData);
  } else {
    return NextResponse.json({ error: orderRes.error }, { status: 400 });
  }
}
