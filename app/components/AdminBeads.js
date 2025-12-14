import Image from "next/image";
import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { protectedFetch } from "../../lib/protectedFetch";
import { COLORS, SHAPES } from "../../lib/constants";

const AdminBeads = () => {
  const [beads, setBeads] = useState([]);
  const [name, setName] = useState("");
  const [diameter, setDiameter] = useState("");
  const [colour, setColour] = useState("red");
  const [shape, setShape] = useState("circle");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [material, setMaterial] = useState("");
  const [notes, setNotes] = useState("");

  const [imageFileDataUrl, setImageFileDataUrl] = useState("");
  const [imageFileType, setImageFileType] = useState("");

  // get all beads
  useEffect(() => {
    const run = async () => {
      const res = await fetch("/api/beads", { method: "GET" });
      const beads = await res.json();
      setBeads(beads);
    };
    run();
  }, []);

  // add new bead
  const addBead = async () => {
    try {
      const beadData = {
        imageFileType: imageFileType,
        imageFileDataUrl: imageFileDataUrl,
        name: name,
        diameterMm: diameter,
        colour: colour,
        shape: shape,
        stock: stock,
        price: price,
        weight: weight,
        material: material,
        notes: notes,
      };

      const result = await protectedFetch("/api/beads", {
        method: "POST",
        body: JSON.stringify(beadData),
      });

      if (result.error) {
        console.error("Error creating bead:", result.error);
        alert("Failed to create bead: " + result.error);
        return;
      }

      setImageFileDataUrl("");
      setImageFileType("");
      setName("");
      setDiameter("");
      setColour("red");
      setShape("circle");
      setStock("");
      setPrice("");
      setWeight("");
      setMaterial("");
      setNotes("");

      const res = await fetch("/api/beads", { method: "GET" });
      const updatedBeads = await res.json();
      setBeads(updatedBeads);
    } catch (error) {
      console.error("Error creating bead:", error);
      alert("Failed to create bead. Please try again.");
    }
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImageFileType(file.type);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageFileDataUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div className="font-inclusiveSans w-full flex flex-row gap-4">
        <div className="w-96 h-fit bg-primaryLight py-8 flex flex-col justify-center gap-3 font-inclusiveSans rounded-xl shadow-lg border-4 border-primary/20">
          <p className="text-center">New bead:</p>
          <div
            {...getRootProps()}
            className={`flex justify-center items-center text-center rounded-lg p-1 mx-10 bg-white h-24 cursor-pointer relative transition-all duration-100 outline outline-2 outline-primary ${
              isDragActive
                ? "outline-offset-2 bg-primary/10"
                : "outline-offset-1 hover:outline-offset-2"
            }`}
          >
            {imageFileDataUrl && (
              <img
                src={imageFileDataUrl}
                alt="bead"
                className={`w-full h-full absolute object-cover rounded-lg ${
                  isDragActive ? "opacity-30" : "hover:opacity-30"
                }`}
              />
            )}
            <input {...getInputProps()} />
            {isDragActive && (
              <p className="relative z-10 pointer-events-none">
                Drop bead image here!
              </p>
            )}
          </div>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            className="rounded-lg p-1 mx-10 focus:outline-primary focus:outline-offset-0 focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            id="diameter"
            name="diameter"
            placeholder="Diameter* (mm)"
            className="rounded-lg p-1 mx-10 focus:outline-primary focus:outline-offset-0 focus:outline-none"
            value={diameter}
            onChange={(e) => setDiameter(e.target.value)}
          />
          <input
            type="text"
            id="price"
            name="price"
            placeholder="Price* ($CAD)"
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
            {COLORS.map((color) => (
              <option key={color.value} value={color.value}>
                {color.label}
              </option>
            ))}
          </select>
          <select
            id="shape"
            name="shape"
            value={shape}
            onChange={(e) => setShape(e.target.value)}
            className="rounded-lg p-1 mx-10 focus:outline-primary focus:outline-offset-0 focus:outline-none "
          >
            {SHAPES.map((shape) => (
              <option key={shape.value} value={shape.value}>
                {shape.label}
              </option>
            ))}
          </select>
          <input
            type="number"
            id="stock"
            name="stock"
            placeholder="Stock*"
            className="rounded-lg p-1 mx-10 focus:outline-primary focus:outline-offset-0 focus:outline-none"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
          <input
            type="number"
            step="0.1"
            id="weight"
            name="weight"
            placeholder="Weight"
            className="rounded-lg p-1 mx-10 focus:outline-primary focus:outline-offset-0 focus:outline-none"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
          <input
            type="text"
            id="material"
            name="material"
            placeholder="Material"
            className="rounded-lg p-1 mx-10 focus:outline-primary focus:outline-offset-0 focus:outline-none"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
          />
          <input
            type="text"
            id="notes"
            name="notes"
            placeholder="Notes"
            className="rounded-lg p-1 mx-10 focus:outline-primary focus:outline-offset-0 focus:outline-none"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <button
            className="bg-primary mx-10 p-2 rounded-full text-white"
            onClick={addBead}
          >
            Submit
          </button>
        </div>
        <div className="w-full max-w-screen-lg bg-background rounded-xl shadow-lg overflow-hidden">
          <div className="bg-primary text-background p-4 grid grid-cols-11 gap-4 font-medium">
            <div>Bead ID</div>
            <div>Image</div>
            <div>Name</div>
            <div>Stock</div>
            <div>Diameter (mm)</div>
            <div>Price (cents)</div>
            <div>Weight</div>
            <div>Colour</div>
            <div>Shape</div>
            <div>Material</div>
            <div>Notes</div>
          </div>

          {beads?.map((bead) => (
            <div
              key={bead.id}
              className="p-4 grid grid-cols-11 text-sm gap-4 border-b border-primaryLight hover:bg-primaryLight/10 transition duration-200"
            >
              <div className="break-words">{bead.id}</div>
              <Image
                src={bead.image_path}
                width={300}
                height={300}
                style={{ height: `${bead.diameter_mm * 5}px` }}
                alt="bead"
                className="w-auto h-auto object-contain"
              />
              <div className="break-words">{bead.name}</div>
              <div className="break-words">{bead.stock}</div>
              <div className="break-words">{bead.diameter_mm}</div>
              <div className="break-words">{bead.price}</div>
              <div className="break-words">{bead.weight}</div>
              <div className="break-words">{bead.colour}</div>
              <div className="break-words">{bead.shape}</div>
              <div className="break-words">{bead.material}</div>
              <div className="break-words">{bead.notes}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminBeads;
