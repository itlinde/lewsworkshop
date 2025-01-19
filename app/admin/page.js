import Header from "../components/Header";

export default function Home() {
  return (
    <div className="">
      <div className="flex flex-col mt-16 items-center bg-primary w-fit p-10 rounded-xl mx-auto space-y-3">
        <h2>wass yo password:</h2>
        <div className="">
          <input type="text" id="password" name="password" placeholder="password" className="rounded-lg p-1"/>
          <buttom type="submit">

          </buttom>
        </div>
      </div>
    </div> 
  );
}
