import { createClient } from "../../../utils/supabase/server";
import { NextResponse } from "next/server";
import crypto from "crypto";

// fetch all bead data
export async function GET(req) {
  try {
    const supabase = await createClient();
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
