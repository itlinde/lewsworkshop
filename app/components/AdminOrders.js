import { useState, useEffect } from "react";
// import { orderService } from "../lib/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("/api/testOrders")
      .then((res) => res.json())
      .then((orders) => setOrders(orders));
  }, []);

  return (
    <>
      <div className="w-full max-w-screen-lg bg-background rounded-xl shadow-lg overflow-hidden">
        <div className="bg-primary text-background p-4 grid grid-cols-7 gap-4 font-medium">
          <div>Order ID</div>
          <div>Date Ordered</div>
          <div>Status</div>
          <div>Address</div>
          <div>Email</div>
          <div>Beads</div>
          <div>Delete</div>
        </div>

        {orders.map((order) => (
          <div
            key={order._id}
            className="p-4 grid grid-cols-7 gap-4 border-b border-primaryLight hover:bg-primaryLight/10 transition duration-200"
          >
            <div className="break-words">{order._id}</div>
            <div className="break-words">{order.orderInfo.dateOrdered}</div>
            <div className="break-words">{order.orderInfo.status}</div>
            <div className="break-words">{order.customerInfo.address}</div>
            <div className="break-words">{order.customerInfo.email}</div>
            <div className="break-words">
              {order.orderInfo.beads.length} items
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminOrders;
