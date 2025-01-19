import { useState, useEffect } from "react";
import { orderService } from "../lib/api";
import Header from "./Header";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    orderService.getOrders().then((orders) => setOrders(orders));
  }, []);

  return (
    <>
      <Header />
      <main className="flex flex-col items-center max-w-screen-lg mx-auto p-8">
        <nav className="w-full mb-8">
          <ul className="flex justify-center space-x-6">
            <li>
              <button className="px-6 py-2 text-primary bg-primaryLight rounded-lg hover:bg-primary hover:text-background transition duration-200">
                Orders
              </button>
            </li>
            <li>
              <button className="px-6 py-2 text-primary bg-primaryLight rounded-lg hover:bg-primary hover:text-background transition duration-200">
                Bead Inventory
              </button>
            </li>
            <li>
              <button className="px-6 py-2 text-primary bg-primaryLight rounded-lg hover:bg-primary hover:text-background transition duration-200">
                Sales
              </button>
            </li>
          </ul>
        </nav>

        <div className="w-full bg-background rounded-lg shadow-lg overflow-hidden">
          <div className="bg-primary text-background p-4 grid grid-cols-6 gap-4 font-medium">
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
      </main>
    </>
  );
};

export default AdminOrders;
