import { createClient } from "../../../utils/supabase/server";
import { NextResponse } from "next/server";

// fetch all bead data
export async function GET(req) {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("beads").select();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};

// request to add a new bead
export async function POST(req) {
  try {
    // make body of post request
    const body = await req.json();
    console.log("POST request recieved data:", body);

    const supabase = await createClient();
    const res = await supabase.from("beads").insert({ image_path: body.image_path,
                                                      diameter_mm: body.diameter_mm,
                                                      price: body.price,
                                                      colour: body.colour,
                                                      shape: body.shape,
                                                      stock: body.stock
    })
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
