import { createClient } from "../../../utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const supabase = await createClient();
        const { data } = await supabase.from("instruments").select();
        
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
};

export async function POST(req) {
    try {
        const body = await req.json();
        console.log("POST request received data: ", body);

        const supabase = await createClient();
        const result = await supabase.from("instruments").insert({ name: body.name });

        return NextResponse.json(result);
    } catch (error) {
        console.log("Error posting data")
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
};