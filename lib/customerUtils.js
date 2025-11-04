import { createClient } from "../utils/supabase/server";

export async function createCustomer(customerData) {
  const supabase = createClient();
  const { data } = await supabase
    .from("customers")
    .upsert(
      {
        name: customerData.name,
        email: customerData.email,
      },
      {
        onConflict: "email",
      }
    )
    .select()
    .single();

  return data;
}
