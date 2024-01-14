// main.jsx

import { createRoot } from "react-dom/client";
import "./styles.css";
import { App as Canvas } from "./Canvas";
import { Overlay, Customizer } from "./Overlay";
import { useState } from "react";

function Main() {
 const [componentToRender, setComponentToRender] = useState("Module1");

 const handleButtonClick = (modules) => {
   if (modules === 1) {
     setComponentToRender("Module1");
   } else if (modules === 2) {
     setComponentToRender("Module2");
   } else if (modules === 3) {
     setComponentToRender("Module3");
   } else if (modules === 4) {
     setComponentToRender("Module4");
   }
 };
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageSelection = (imageUrl) => {
    setSelectedImage(imageUrl);
  };
  return (
    <div className="container">
      <Canvas
        selectedImage={selectedImage}
        componentToRender={componentToRender}
      />
      <Overlay
        onButtonClick={handleButtonClick}
        onSelectImage={handleImageSelection}
      />
    </div>
  );
}

createRoot(document.getElementById("root")).render(<Main />);
