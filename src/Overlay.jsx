import { motion, AnimatePresence } from "framer-motion";
import {
  AiFillCamera,
  AiOutlineArrowLeft,
  AiOutlineHighlight,
  AiOutlineShopping,
} from "react-icons/ai";
import { useSnapshot } from "valtio";
import { state } from "./store";
import { useDropzone } from "react-dropzone";
import { useState, useEffect } from 'react';
import { ImMug } from "react-icons/im";
import { PiBaseballCapFill } from "react-icons/pi";
import { FaTshirt } from "react-icons/fa";
import { BiSolidShoppingBagAlt } from "react-icons/bi";

export function Overlay({ onSelectImage, onButtonClick }) {
  const snap = useSnapshot(state);

  const transition = { type: "spring", duration: 0.8 };
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSelectFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      onSelectImage(imageUrl); // Pass the selected image URL to the parent component
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <AnimatePresence mode="wait">
        {snap.intro ? (
          <motion.section
            key="main"
            initial={{
              x: -100,
              opacity: 0,
              transition: { ...transition, delay: 0.5 },
            }}
            animate={{
              x: 0,
              opacity: 1,
              transition: { ...transition, delay: 0 },
            }}
            exit={{
              x: -100,
              opacity: 0,
              transition: { ...transition, delay: 0 },
            }}
          >
            <div className="decals">
              <div className="decals--container">
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    marginLeft: "-20px",
                  }}
                >
                  <li onClick={() => onButtonClick(1)}>
                    <FaTshirt
                      style={{ margin: 5, width: "150%", color: snap.color }}
                    />
                  </li>
                  <li onClick={() => onButtonClick(2)}>
                    <ImMug
                      style={{ margin: 5, width: "150%", color: snap.color }}
                    />
                  </li>
                  <li onClick={() => onButtonClick(3)}>
                    <PiBaseballCapFill
                      style={{
                        margin: 5,
                        position: "relative",
                        right: 15,
                        width: "250%",
                        color: snap.color,
                      }}
                    />
                  </li>
                  <li onClick={() => onButtonClick(4)}>
                    <BiSolidShoppingBagAlt
                      style={{
                        margin: 5,
                        width: "150%",
                        position: "relative",
                        right: 3,
                        color: snap.color,
                      }}
                    />
                  </li>
                </ul>
              </div>
            </div>

            <Customizer />
            <form
              style={{ positon: "relative", bottom: "10px", color: snap.color }}
            >
              <input
                style={{
                  positon: "relative",
                  bottom: "10px",
                  color: snap.color,
                }}
                type="file"
                onChange={handleSelectFile}
                accept=".png,.jpg,.jpeg"
              />
            </form>
          </motion.section>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export  function Customizer({ onButtonClick }) {
   const snap = useSnapshot(state);




   return (
     <>
       <div className="customizer">
         <div className="color-options">
           {snap.colors.map((color) => (
             <div
               key={color}
               className={`circle`}
               style={{ background: color }}
               onClick={() => (state.color = color)}
             ></div>
           ))}
         </div>
        
        
       </div>
       <button
         className="share"
         style={{ background: snap.color }}
         onClick={() => {
           const link = document.createElement("a");
           link.setAttribute("download", "canvas.png");
           link.setAttribute(
             "href",
             document
               .querySelector("canvas")
               .toDataURL("image/png")
               .replace("image/png", "image/octet-stream")
           );
           link.click();
         }}
       >
         DOWNLOAD
         <AiFillCamera size="1.3em" />
       </button>
     </>
   );
 }

