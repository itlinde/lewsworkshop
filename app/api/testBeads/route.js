import clientPromise from "../../../backend/mongodb";
import { Bead } from "../../../backend/models/bead";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

const client = await clientPromise;
const database = client.db("fredTesting");
const beadsCollection = database.collection("beads");

export async function GET() {
  try {
    const beads = await beadsCollection.find({}).toArray();
    return NextResponse.json(beads);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

const beaverImage =
  "https://cloudfront-us-east-1.images.arcpublishing.com/opb/DKGDGW5PKJLFBFUTFD4UIH2EAI.jpg";

const testBead = new Bead({
  id: uuidv4(),
  stock: 10,
  image: beaverImage,
  diameter: 10,
  colour: "red",
  shape: "butterfly",
});

export async function POST(req) {
  try {
    const body = await req.json();

    const newBead = new Bead({
      id: uuidv4(),
      stock: body.stock,
      image: body.image,
      diameter: body.diameter,
      colour: body.colour,
      shape: body.shape,
    });

    // const newBead = testBead;

    const result = await beadsCollection.insertOne(newBead);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
