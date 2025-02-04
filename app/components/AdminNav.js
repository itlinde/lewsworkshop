import { useState, useEffect } from "react";
import AdminOrders from "../components/AdminOrders";
import AdminOrdersNew from "../components/AdminOrdersNew";
import AdminBeads from "../components/AdminBeads";
import Header from "./Header";

const AdminNav = () => {
  const [ordersScreen, setOrdersScreen] = useState(true);
  const [beadsScreen, setBeadsScreen] = useState(false);

  return (
    <>
    <Header />
    <main className="flex flex-col items-center max-w-screen-xl mx-auto p-8">
      <nav className="w-full mb-8">
        <ul className="flex justify-center space-x-6">
          <li>
            <button className="px-6 py-2 text-primary bg-primaryLight rounded-lg hover:bg-primary hover:text-background transition duration-200"
                    onClick={() => {
                      setOrdersScreen(true);
                      setBeadsScreen(false);
                    }}>
              Orders
            </button>
          </li>
          <li>
            <button className="px-6 py-2 text-primary bg-primaryLight rounded-lg hover:bg-primary hover:text-background transition duration-200"
                    onClick={() => {
                      setOrdersScreen(false);
                      setBeadsScreen(true);
                    }}>
              Bead Inventory
            </button>
          </li>
        </ul>
      </nav>

      {ordersScreen && <AdminOrdersNew /> }
      {beadsScreen && !ordersScreen && <AdminBeads />}
      
    </main>
    </>
  )
}

export default AdminNav;