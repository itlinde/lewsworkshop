import Header from "./components/Header";
import JewelryMaker from "./components/JewelryMaker";
import JewelryMaker2 from "./components/JewelryMaker2";
import Faq from "./components/Faq";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center md:hidden text-textDark">
        <p className="">Please use our website on a tablet or laptop! </p>
        <p className="italic text-textLight">(Mobile page coming soon)</p>
      </div>
      <div className="hidden md:block">
        <JewelryMaker2 />
      </div>
    </>
  );
}
