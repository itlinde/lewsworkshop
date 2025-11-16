import { createClient } from "../utils/supabase/server";

export async function createDraftOrder(orderData) {
  try {
    const { price, session_id, beads } = orderData;

    const supabase = createClient();

    const { data: orderRes } = await supabase
      .from("orders")
      .insert({
        price: price,
        status: "draft",
        session_id: session_id,
      })
      .select()
      .single();

    const orderResData = orderRes;

    if (beads) {
      for (const bead of beads) {
        await supabase.from("orders_beads").insert({
          order_id: orderResData.id,
          bead_id: bead.id,
        });
      }
    }

    return { ok: true, orderData: orderResData };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}

export async function updateOrder(orderId, updateData) {
  const {
    session_id,
    status,
    delivery_method,
    customer_id,
    country,
    postal_code,
  } = updateData;

  try {
    const supabase = createClient();

    const { data } = await supabase
      .from("orders")
      .update({
        session_id: session_id,
        status: status,
        delivery_method: delivery_method,
        customer_id: customer_id,
        country: country,
        postal_code: postal_code,
      })
      .eq("id", orderId)
      .select()
      .single();

    return { ok: true, orderData: data };
  } catch (error) {
    console.error(`Failed to update order ${orderId}:`, error);
    return { ok: false, error: error.message };
  }
}
