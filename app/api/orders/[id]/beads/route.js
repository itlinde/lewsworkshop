import { createClient } from "../../../../../utils/supabase/server";
import { NextResponse } from "next/server";

// fetch bead data for a given order
export async function GET(req, { params }) {
  try {
    const supabase = await createClient();

    const { id } = params;
    
    // get - given an order ID > check orders_beads, get the bead IDs for that order
    // const { data } = await supabase.from("orders_beads").select('bead_id').eq('order_id', id);
    
    const { data } = await supabase.from("orders_beads").select(`
      id,
      beads (
        id, image_path, diameter_mm, stock
      )
      `)
      .eq('order_id', id);

    // // with the bead IDs > get those beads from the beads table
    // return the beads


    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}