import { createClient } from "../../../utils/supabase/server";
import { NextResponse } from "next/server";

// fetch all bead data
export async function GET() {
  try {
    const supabase = createClient(); // dsjfladsjfk ldjsfl
    const { data } = await supabase.from("beads").select();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// request to add a new bead
export async function POST(req) {
  try {
    // make body of post request
    const body = await req.json();

    const supabase = createClient(); // dsjfladsjfk ldjsfl
    // could we just do this?
    const res = await supabase.from("beads").insert(body);
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
