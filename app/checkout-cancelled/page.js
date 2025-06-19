import Link from "next/link";

export default function CheckoutFailed() {
  return (
    <div>
      <h1>Checkout Cancelled</h1>
      <p>Your checkout was cancelled.</p>
      <Link href="/" className="text-blue-500">
        Go back to the home page
      </Link>
    </div>
  );
}
