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
};

// request to add a new order
export async function POST(req) {
  try {
    // make body of post request
    const body = await req.json();
    console.log("POST request recieved data:", body);

    const supabase = await createClient();
    const res = await supabase.from("orders").insert({ 
                                                      total: body.total,
                                                      status: body.status,
                                                      delivery_method: body.delivery_method,
                                                      customer_id: body.customer_id,
                                                      date_ordered: body.date_ordered
    })
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}