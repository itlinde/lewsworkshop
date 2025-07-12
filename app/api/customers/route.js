import { createClient } from "../../../utils/supabase/server";
import { NextResponse } from "next/server";

// fetch all order data
export async function GET(req) {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("customers").select();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// request to add a new customer
export async function POST(req) {
  try {
    // make body of post request
    const body = await req.json();

    const customerRes = await createCustomer(body);
    return NextResponse.json(customerRes);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
