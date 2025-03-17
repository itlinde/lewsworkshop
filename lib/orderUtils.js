import { createClient } from "../utils/supabase/server";

export async function createOrder(orderData) {
  try {
    const {
      price,
      status,
      delivery_method,
      country,
      address,
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
        address: address,
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
    return { ok: false, error: error.message };
  }
}
