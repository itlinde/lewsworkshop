import { updateOrder } from "../../../../lib/orderUtils";
import { NextResponse } from "next/server";


export async function PATCH(req, { params }) {
  const id = await params.id;
  const updateData = await req.json();

  console.log("in the route handler!");
  console.log("ID = " + id);
  console.log(req);


  const orderRes = await updateOrder(id, updateData);

  if (orderRes.ok) {
    return NextResponse.json(orderRes.orderData);
  } else {
    return NextResponse.json({ error: orderRes.error }, { status: 400 });
  }
}
