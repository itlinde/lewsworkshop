import { createClient } from "../../../utils/supabase/server";
import { NextResponse } from "next/server";

// fetch all order data
export async function GET(req) {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("orders").select();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// request to add a new order
export async function POST(req) {
  try {
    // make body of post request
    const body = await req.json();

    const supabase = await createClient();

    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert({
        total: body.total,
        status: body.status,
        delivery_method: body.delivery_method,
        country: body.country,
        address: body.address,
        postal_code: body.postal_code,
        customer_id: body.customer_id,
        date_ordered: new Date().toISOString(),
      })
      .select()
      .single();

    const beads = body.beads;

    for (const bead of beads) {
      const { data: beadData, error: beadError } = await supabase
        .from("orders_beads")
        .insert({
          order_id: orderData.id,
          bead_id: bead.id,
        });
    }

    return NextResponse.json(orderData);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
