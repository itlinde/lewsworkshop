import { useState, useEffect } from "react";

const formatDate = (date) => {
  return date.split("T")[0];
}

const formatPrice = (price) => {
  price /= 100;
  return price;
}

const JoinOrdersCustomers = (customers, customerId) => {
  // takes an order's customer ID, finds that customer in the customers array, and returns its name
  const customer = customers.find(customer => customer.id === customerId);
  return (customer ? customer.name : "");
}

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);

  // get orders
  useEffect(() => {
    const run = async () => {
      const res = await fetch("/api/orders", { method: "GET" });
      const orders = await res.json();
      setOrders(orders);
    };
    run();
  }, []);

  // get customers 
  useEffect(() => {
    const run = async () => {
      const res = await fetch("/api/customers", { method: "GET" });
      const customers = await res.json();
      setCustomers(customers);
    };
    run();
  }, []);

  return (
    <>
      <div className="text-textDark font-inclusiveSans w-full max-w-screen-lg bg-background rounded-xl overflow-hidden">
        <div className="bg-backgroundDark p-4 grid grid-cols-6 gap-4 font-medium border-b-[1.5px] border-textLight">
          <div>Order ID</div>
          <div>Customer</div>
          <div>Total</div>
          <div>Status</div>
          <div>Date Ordered</div>
          <div>Beads</div>
        </div>

        {orders?.map((order) => (
          <div
            key={order.id}
            className="p-4 grid grid-cols-6 gap-4 border-b border-primaryLight hover:bg-primaryLight/10 transition duration-200"
          >
            <div className="break-words">{order.id}</div>
            <div className="break-words">{ order.customer_id ? JoinOrdersCustomers(customers, order.customer_id) : "-"}</div>
            <div className="break-words">${formatPrice(order.price).toFixed(2)}</div>
            <div className="break-words">{order.status}</div>
            <div className="break-words">{formatDate(order.date_ordered)}</div>
            <div className="break-words">
              <button>
                <p className="py-1 px-3 rounded-2xl border-textDark border-[1.5px]">
                View Beads
                </p>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminOrders;
