import { useState, useEffect } from "react";

const AdminBeads = () => {
  const [beads, setBeads] = useState([]);
  const [image, setImage] = useState("");
  const [diameter, setDiameter] = useState("");
  const [price, setPrice] = useState("");
  const [colour, setColour] = useState("red");
  const [shape, setShape] = useState("circle");
  const [stock, setStock] = useState("");

  // get all beads
  useEffect(() => {
    fetch("/api/beads")
      .then((res) => res.json())
      .then((beads) => setBeads(beads));
  }, []);

  // add new bead
  const addBead = async () => {
    try {
        const beadData = {
            image_path: image,
            diameter_mm: diameter,
            price: price,
            colour: colour,
            shape: shape,
            stock: stock
        };

        await fetch("/api/beads", {
            method: "POST",
            body: JSON.stringify(beadData),
        });
        console.log("successfully sent bead POST request");
    } catch (error) {
        console.error("Error creating bead:", error);
    }
  };


  return (
    <>
    <div className="w-full flex flex-row gap-4">
      <div className="w-96 bg-primaryLight py-8 flex flex-col justify-center gap-3 font-inclusiveSans rounded-xl shadow-lg border-4 border-primary/20">
        <p className="text-center">New bead:</p>
        <input 
          type="text"
          id="image"
          name="image"
          placeholder="Image (use emoji)"
          className="rounded-lg p-1 mx-10 focus:outline-primary focus:outline-offset-0 focus:outline-none"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          type="text"
          id="diameter"
          name="diameter"
          placeholder="Diameter (mm)"
          className="rounded-lg p-1 mx-10 focus:outline-primary focus:outline-offset-0 focus:outline-none"
          value={diameter}
          onChange={(e) => setDiameter(e.target.value)}
        />
        <input
          type="text"
          id="price"
          name="price"
          placeholder="Price ($CAD)"
          className="rounded-lg p-1 mx-10 focus:outline-primary focus:outline-offset-0 focus:outline-none"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <select 
          id="colour" 
          name="colour"
          value={colour}
          onChange={(e) => setColour(e.target.value)}
          className="rounded-lg p-1 mx-10 focus:outline-primary focus:outline-offset-0 focus:outline-none "
        >
          <option value="red">Red</option>
          <option value="orange">Orange</option>
          <option value="yellow">Yellow</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="purple">Purple</option>
          <option value="pink">Pink</option>
          <option value="white">White</option>
          <option value="black">Black</option>
        </select>
        <select 
          id="shape" 
          name="shape"
          value={shape}
          onChange={(e) => setShape(e.target.value)}
          className="rounded-lg p-1 mx-10 focus:outline-primary focus:outline-offset-0 focus:outline-none "
        >
          <option value="circle">Circle</option>
          <option value="heart">Heart</option>
          <option value="butterfly">Butterfly</option>
          <option value="star">Star</option>
          <option value="flower">Flower</option>
          <option value="cube">Cube</option>
          <option value="other">Other</option>
        </select>
        <input
          type="text"
          id="stock"
          name="stock"
          placeholder="Stock"
          className="rounded-lg p-1 mx-10 focus:outline-primary focus:outline-offset-0 focus:outline-none"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
        <button className="bg-primary mx-10 p-2 rounded-full text-white"
                onClick={() => addBead()}>
          Submit
        </button>
      </div>
      <div className="w-full max-w-screen-lg bg-background rounded-xl shadow-lg overflow-hidden">
        <div className="bg-primary text-background p-4 grid grid-cols-7 gap-4 font-medium">
          <div>Bead ID</div>
          <div>Image</div>
          <div>Diameter (mm)</div>
          <div>Price ($CAD)</div>
          <div>Colour</div>
          <div>Shape</div>
          <div>Stock</div>
        </div>

        {beads.map((bead) => (
          <div
            key={bead.id}
            className="p-4 grid grid-cols-7 gap-4 border-b border-primaryLight hover:bg-primaryLight/10 transition duration-200"
            >
            <div className="break-words">{bead.id}</div>
            <div className="break-words">{bead.image_path}</div>
            <div className="break-words">{bead.diameter_mm}</div>
            <div className="break-words">{bead.price}</div>
            <div className="break-words">{bead.colour}</div>
            <div className="break-words">{bead.shape}</div>
            <div className="break-words">{bead.stock}</div>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default AdminBeads;