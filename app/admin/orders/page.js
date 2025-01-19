import Header from "../../components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col max-w-screen-lg place-self-center">
        <div id="navbar" className="flex space-x-10 justify-center">
          <a className="bg-blue-200">Orders</a>
          <a className="bg-blue-200">Bead Inventory</a>
          <a className="bg-blue-200">Sales</a>
        </div>
        <div id="orders">
          <div id="orders-header" className="bg-pink-400 flex space-x-10 justify-center">
            <p>order id</p>
            <p>date ordered</p>
            <p>order status</p>
            <p>delivery address</p>
            <p>email</p>
            <p>beads</p>
          </div>

          <div id="order1" className="bg-pink-300 flex space-x-10 justify-center">
            <p>order id</p>
            <p>date ordered</p>
            <p>order status</p>
            <p>delivery address</p>
            <p>email</p>
            <p>beads</p>
          </div>
        </div>
      </main>
    </> 
  );
}
