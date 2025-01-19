import Header from "./components/Header";
import JewelryMaker from "./components/JewelryMaker";
import Faq from "./components/Faq";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div>

      <Header />
      <main className="flex justify-center">
        <div className="w-[80vw]">
          <div className="h-[calc(100vh-50px)] flex items-center">
            <JewelryMaker />
          </div>
          <Faq />
        </div>
      </main>
      <Footer />
    </div>
  );
}
