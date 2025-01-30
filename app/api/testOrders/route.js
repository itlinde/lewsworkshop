import clientPromise from "../../../backend/mongodb";
import { Order } from "../../../backend/models/order";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

const client = await clientPromise;
const database = client.db("fredTesting");
const ordersCollection = database.collection("orders");

export async function GET() {
  try {
    const orders = await ordersCollection.find({}).toArray();
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

const testOrder = new Order({
  id: uuidv4(),
  orderInfo: {
    dateOrdered: new Date(),
    status: "Pending",
    beads: [
      {
        stock: 15,
        image: "testImage",
        diameter: 12,
        colour: "red",
        shape: "heart",
      },
      {
        stock: 15,
        image: "testImage",
        diameter: 10,
        colour: "blue",
        shape: "star",
      },
    ],
  },
  customerInfo: {
    email: "test@example.com",
    address: "123 Test St, Test City, TS1 2AB",
  },
});

export async function POST(req) {
  try {
    const body = await req.json();

    const newOrder = new Order({
      id: uuidv4(),
      orderInfo: body.orderInfo,
      customerInfo: body.customerInfo,
    });

    // const newOrder = testOrder;

    const result = await ordersCollection.insertOne(newOrder);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
