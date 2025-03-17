import Link from "next/link";

export default function CheckoutSuccess() {
  return (
    <div>
      <h1>Checkout Success</h1>
      <p>Thank you for your purchase!</p>
      <Link href="/" className="text-blue-500">
        Go back to the home page
      </Link>
    </div>
  );
}
