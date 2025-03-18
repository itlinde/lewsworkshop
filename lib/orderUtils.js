import { createClient } from "../utils/supabase/server";

export async function createOrder(orderData) {
  try {
    const {
      price,
      status,
      delivery_method,
      country,
      postal_code,
      customer_id,
      beads,
    } = orderData;

    const supabase = await createClient();

    const { data: orderRes } = await supabase
      .from("orders")
      .insert({
        total: price,
        status: status,
        delivery_method: delivery_method,
        country: country,
        postal_code: postal_code,
        customer_id: customer_id,
        date_ordered: new Date().toISOString(),
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
    console.error("Error creating order:", error);
    return { ok: false, error: error.message };
  }
}

export async function updateOrder(orderId, updateData) {
  try {
    const supabase = await createClient();

    const { data } = await supabase
      .from("orders")
      .update({
        status: updateData.status,
        delivery_method: updateData.delivery_method,
        customer_id: updateData.customer_id,
        country: updateData.country,
        postal_code: updateData.postal_code,
      })
      .eq("id", orderId)
      .select()
      .single();

    return { ok: true, orderData: data };
  } catch (error) {
    console.error("Error updating order:", error);
    return { ok: false, error: error.message };
  }
}
