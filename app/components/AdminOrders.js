import { useState, useEffect } from "react";
import { protectedFetch } from "../../lib/protectedFetch";
import Image from "next/image";

const formatDate = (date) => {
  return date.split("T")[0];
};

const formatPrice = (price) => {
  price /= 100;
  return price;
};

const JoinOrdersCustomers = (customers, customerId) => {
  // takes an order's customer ID, finds that customer in the customers array, and returns its name
  const customer = customers.find((customer) => customer.id === customerId);
  return customer ? customer.name : "";
};

/* TO DO:
- make a simple button to change status when clicked (change status to 'processing' for now)
  - connect to API endpoint
- make it so clicking each button in the menu results in different status
- refactor status styling
- can we make it so clicking a new status doesn't refresh the page?
*/

// how to write patch req
const updateOrderStatus = async (orderId, status) => {
  try {
    const orderData = { status };

    console.log(orderId);
    console.log(orderData);
    console.log(JSON.stringify(orderData));

    await protectedFetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });
  } catch (error) {
    console.error("Error updating status:", error);
  }
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [ordersBeads, setOrdersBeads] = useState([]);
  const [viewOrdersBeads, setViewOrdersBeads] = useState();
  const [openStatusMenu, setOpenStatusMenu] = useState(null);

  // get orders
  useEffect(() => {
    const run = async () => {
      const orders = await protectedFetch("/api/orders", { method: "GET" });
      setOrders(orders);
    };
    run();
  }, []);

  // get customers
  useEffect(() => {
    const run = async () => {
      const customers = await protectedFetch("/api/customers", { method: "GET" });
      setCustomers(customers);
    };
    run();
  }, []);

  useEffect(() => {
    const run = async () => {
      const ordersBeads = await protectedFetch(`/api/orders/${viewOrdersBeads}/beads`, {
        method: "GET",
      });
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

          <div className="mb-40">
            {orders?.map((order) => (
              <div
                key={order.id}
                className="p-3 grid grid-cols-6 gap-3 items-center border-b-[1.5px] border-primaryLight/50 hover:bg-primaryLight/10 transition duration-200"
              >
                <div className="break-words">{order.id}</div>
                <StatusStyling
                  status={order.status}
                  onClick={() => {
                    setOpenStatusMenu((prev) =>
                      prev === order.id ? null : order.id
                    );
                  }}
                  openStatusMenu={openStatusMenu === order.id}
                  orderId={order.id}
                />
                <div className="break-words">
                  {order.customer_id
                    ? JoinOrdersCustomers(customers, order.customer_id)
                    : "-"}
                </div>
                <div className="break-words">
                  ${formatPrice(order.price).toFixed(2)}
                </div>
                <div className="break-words">
                  {formatDate(order.date_ordered)}
                </div>
                <div className="break-words">
                  <button
                    onClick={() => {
                      setViewOrdersBeads(order.id);
                    }}
                  >
                    <p className="py-1 px-3 rounded-xl border-textDark border-[1.5px] hover:bg-backgroundDark transition ease-in-out active:bg-textDark active:text-background active:transition-none">
                      View Beads
                    </p>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-backgroundDark flex-col w-full place-content-center md:max-w-96 h-96 md:h-screen rounded-xl border-[1.5px] sticky">
          {ordersBeads?.map((bead) => (
            <div key={bead.id}>
              <Image
                src={bead.beads.image_path}
                width={300}
                height={300}
                style={{ height: `${bead.beads.diameter_mm * 5}px` }}
                alt="bead"
                className="place-self-center w-auto h-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminOrders;

const StatusDropDown = ({ orderId }) => {
  const classes =
    "block text-sm/6 text-left hover:bg-backgroundDark w-full px-4 active:bg-textLight active:text-background";
  return (
    <div className="z-10 py-1 bg-background block absolute shadow-lg rounded-md">
      <button
        className={classes}
        onClick={() => {
          updateOrderStatus(orderId, "delivered");
        }}
      >
        Draft
      </button>
      <button className={classes}>Pending</button>
      <button className={classes}>Processing</button>
      <button className={classes}>Shipped</button>
      <button className={classes}>Delivered</button>
      <button className={classes}>Cancelled</button>
    </div>
  );
};

function StatusStyling({ status, onClick, openStatusMenu, orderId }) {
  // returns styling
  switch (status) {
    case "draft":
      return (
        <div className="relative group">
          <div
            className="bg-backgroundDark/40 text-textLight group break-words py-0.5 px-2 w-fit rounded-md"
            onClick={onClick}
          >
            {status}
            <svg
              className="inline size-0 pl-1 group-hover:size-fit"
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.5 1L5 5L0.5 1"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          {/* status change dropdown isn't done yet .: commented out */}
          {/* { openStatusMenu && (
            <StatusDropDown orderId={orderId}/>
          )} */}
        </div>
      );
    case "pending":
      return (
        <div
          className=" bg-progressYellow/40 text-yellow-600 group break-words py-0.5 px-2 w-fit rounded-md"
          onClick={onClick}
        >
          {status}
          <svg
            className="inline size-0 pl-1 group-hover:size-fit"
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.5 1L5 5L0.5 1"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      );
    case "processing":
      return (
        <div
          className=" bg-progressYellow/40 text-yellow-600 group break-words py-0.5 px-2 w-fit rounded-md"
          onClick={onClick}
        >
          {status}
          <svg
            className="inline size-0 pl-1 group-hover:size-fit"
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.5 1L5 5L0.5 1"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      );
    case "shipped":
      return (
        <div
          className="bg-secondary/40 text-primaryDark group break-words py-0.5 px-2 w-fit rounded-md"
          onClick={onClick}
        >
          {status}
          <svg
            className="inline size-0 pl-1 group-hover:size-fit"
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.5 1L5 5L0.5 1"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      );
    case "delivered":
      return (
        <div
          className="bg-successGreen/40 text-lime-600 group break-words py-0.5 px-2 w-fit rounded-md"
          onClick={onClick}
        >
          {status}
          <svg
            className="inline size-0 pl-1 group-hover:size-fit"
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.5 1L5 5L0.5 1"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      );
    case "cancelled":
      return (
        <div
          className="bg-failRed/40 text-orange-700 group break-words py-0.5 px-2 w-fit rounded-md"
          onClick={onClick}
        >
          {status}
          <svg
            className="inline size-0 pl-1 group-hover:size-fit"
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.5 1L5 5L0.5 1"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      );
  }
}
