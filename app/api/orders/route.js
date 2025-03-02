import { createClient } from "../../../utils/supabase/server";
import { NextResponse } from "next/server";

// fetch all order data
export async function GET(req) {
  // this req param is unused do we need it in the arguments?
  try {
    const supabase = createClient(); // do we need to await this? i just removed that and we got no errors
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

    const supabase = createClient(); // this too
    // could we just do this?
    const res = await supabase.from("orders").insert(body);
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
