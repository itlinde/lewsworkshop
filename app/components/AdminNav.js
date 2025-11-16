import { useState } from "react";
import AdminOrders from "./AdminOrders";
import AdminBeads from "../components/AdminBeads";
import Header from "./Header";
const AdminNav = () => {
  const [ordersScreen, setOrdersScreen] = useState(true);
  const [beadsScreen, setBeadsScreen] = useState(false);

  return (
    <>
    <div className="p-6">
      <Header/>
      <main className="font-inclusiveSans flex flex-col items-center max-w-screen-xl mx-auto px-4">
        <nav className="w-full pt-2 pb-4 border-b-[1.5px] mb-4">
          <ul className="flex space-x-2">
            <li>
              <button
                className={`px-5 py-1.5 ${ !ordersScreen ? "text-textDark" : "bg-secondary/50 text-primary" } rounded-md hover:bg-primary hover:text-background transition duration-200`}
                onClick={() => {
                  setOrdersScreen(true);
                  setBeadsScreen(false);
                }}
              >
                Orders
              </button>
            </li>
            <li>
              <button
                className={`px-5 py-1.5 ${ ordersScreen ? "text-textDark" : "bg-secondary/50 text-primary" } rounded-md hover:bg-primary hover:text-background transition duration-200`}
                onClick={() => {
                  setOrdersScreen(false);
                  setBeadsScreen(true);
                }}
              >
                Bead Inventory
              </button>
            </li>
          </ul>
        </nav>
        {ordersScreen && <AdminOrders />}
        {beadsScreen && !ordersScreen && <AdminBeads />}
      </main>
    </div>
    </>
  );
};

export default AdminNav;
