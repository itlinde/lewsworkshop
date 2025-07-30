import { useState, useEffect } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

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
  const [ordersBeads, setOrdersBeads] = useState([]);
  const [viewOrdersBeads, setViewOrdersBeads] = useState();

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

  useEffect(() => {
    const run = async () => {
      const res = await fetch(`/api/orders/${viewOrdersBeads}/beads`, { method: "GET" });
      const ordersBeads = await res.json();
      setOrdersBeads(ordersBeads);
    };
    run();
  }, [viewOrdersBeads]);

  return (
    <>
    <div className="text-sm md:text-sm w-full flex flex-col-reverse max-w-screen-xl md:flex-row gap-6 justify-center">
      <div className="text-textDark font-inclusiveSans max-w-screen-md shrink-0 bg-background rounded-xl overflow-hidden">
        <div className="bg-backgroundDark p-3 grid grid-cols-6 gap-4 font-medium border-b-[1.5px] border-textLight">
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
            className="p-3 grid grid-cols-6 gap-3 items-center border-b-[1.5px] border-primaryLight/50 hover:bg-primaryLight/10 transition duration-200"
          >
            <div className="break-words">{order.id}</div>
            <div className="break-words">{ order.customer_id ? JoinOrdersCustomers(customers, order.customer_id) : "-"}</div>
            <div className="break-words">${formatPrice(order.price).toFixed(2)}</div>
            <div className="break-words">{order.status}</div>
            <div className="break-words">{formatDate(order.date_ordered)}</div>
            <div className="break-words">
              <button onClick={ () => {
                setViewOrdersBeads(order.id);
              }}>
                <p className="py-1 px-2 rounded-xl border-textDark border-[1.5px] hover:bg-backgroundDark transition ease-in-out active:bg-textDark active:text-background active:transition-none">
                View Beads
                </p>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-backgroundDark flex-col w-full place-content-center md:max-w-96 h-96 md:h-screen rounded-xl border-[1.5px] sticky">
        {ordersBeads?.map((bead) => (
          <div key={bead.id}>
            <Image src={bead.beads.image_path} width={300} height={300} style={{ height: `${bead.beads.diameter_mm * 5}px` }} alt="bead" className="place-self-center w-auto h-auto object-contain" />
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default AdminOrders;
