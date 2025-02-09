import { useState, useEffect } from "react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/ordersSupabase")
      .then((res) => res.json())
      .then((orders) => setOrders(orders));
  }, []);

  return (
    <>
      <div className="w-full max-w-screen-lg bg-background rounded-xl shadow-lg overflow-hidden">
        <div className="bg-primary text-background p-4 grid grid-cols-7 gap-4 font-medium">
          <div>Order ID</div>
          <div>Date Ordered</div>
          <div>Total</div>
          <div>Status</div>
          <div>Delivery Method</div>
          <div>Customer ID</div>
          <div>Beads</div>
        </div>

        {orders.map((order) => (
          <div
            key={order.id}
            className="p-4 grid grid-cols-7 gap-4 border-b border-primaryLight hover:bg-primaryLight/10 transition duration-200"
          >
            <div className="break-words">{order.id}</div>
            <div className="break-words">{order.date_ordered}</div>
            <div className="break-words">{order.total}</div>
            <div className="break-words">{order.status}</div>
            <div className="break-words">{order.delivery_method}</div>
            <div className="break-words">{order.customer_id}</div>
            <div className="break-words">beads</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminOrders;
