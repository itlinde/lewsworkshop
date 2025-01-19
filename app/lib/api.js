const BASE_URL = "http://localhost:5000";

export const orderService = {
  createOrder: async (orderData) => {
    try {
      const response = await fetch(`${BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    } catch (err) {
      console.error("Error creating order:", err);
      throw err;
    }
  },

  getOrders: async () => {
    try {
      const response = await fetch(`${BASE_URL}/orders`, {
        next: {
          revalidate: 60,
        },
      });
      return response.json();
    } catch (err) {
      console.error("Error fetching orders:", err);
      throw err;
    }
  },

  getOrder: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/orders/${id}`, {
        next: {
          revalidate: 60,
        },
      });
      return response.json();
    } catch (err) {
      console.error("Error fetching order:", err);
      throw err;
    }
  },

  deleteOrder: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/orders/${id}`, {
        method: "DELETE",
      });
      return response.json();
    } catch (err) {
      console.error("Error deleting order:", err);
      throw err;
    }
  },
};
