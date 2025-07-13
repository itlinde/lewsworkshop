import Link from "next/link";
import Header from "../components/Header";

export default function CheckoutSuccess() {
  return (
    <div className="text-center m-6">
      <Header/>
      <div className="bg-background p-16 rounded-2xl shadow-md border-[1.5px] border-textLight/15">
        <div className="flex-col justify-center">
          <p className="mb-6">Checkout success. <br/> Thank you for your purchase!</p>
          <Link href="/" className="px-5 py-3 bg-background text-primaryDark border-[1.5px] border-primaryDark rounded-2xl hover:bg-primaryLight/45 active:bg-primaryLight/70 transition ease-in-out">
            Back to the home page
          </Link>
        </div>
      </div>
    </div>
  );
}
