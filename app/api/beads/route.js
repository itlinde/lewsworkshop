import { createClient } from "../../../utils/supabase/server";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { parse } from "url";

// fetch beads
export async function GET(req) {
  try {
    const supabase = await createClient();
    // const { data } = await supabase.from("beads").select();

    // Extract query parameters (e.g., ?color=red&size=6&shape=round)
    const { query } = parse(req.url, true);
    const { colour, size, shape } = query;

    // Start building the query
    let queryBuilder = supabase.from("beads").select("*").order('id', {ascending: false});

    // Apply filters if they exist
    if (colour) queryBuilder = queryBuilder.eq("colour", colour);
    if (size) queryBuilder = queryBuilder.eq("diameter_mm", size);
    if (shape) queryBuilder = queryBuilder.eq("shape", shape);

    // fetch filtered data
    const { data } = await queryBuilder;

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

    const supabase = await createClient();

    const dataUrl = body.imageFileDataUrl;
    const fileType = body.imageFileType;

    const base64Data = dataUrl.split(",")[1];
    const buffer = Buffer.from(base64Data, "base64");

    const bufferHash = crypto.createHash("sha256").update(buffer).digest("hex");

    // store path as hash of buffer to avoid duplicates
    const filePath = `images/${bufferHash}`;

    await supabase.storage.from("beads-info").upload(filePath, buffer, {
      upsert: true,
      contentType: fileType,
    });

    const {
      data: { publicUrl },
    } = supabase.storage.from("beads-info").getPublicUrl(filePath);

    const res = await supabase
      .from("beads")
      .insert({
        image_path: publicUrl,
        diameter_mm: body.diameterMm,
        name: body.name,
        colour: body.colour,
        shape: body.shape,
        stock: body.stock,
        price: body.price,
      })
      .select()
      .single();

    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
