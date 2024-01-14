import { proxy } from 'valtio'

const state = proxy({
  intro: true,
  colors: ["#ccc", "#EFBD4E", "#80C670", "#726DE8", "#EF674E", "#353934"],
  decals: ["react", "three2", "pmndrs"],
  color: "#EFBD4E",
  decal: "three2",
  selectedModel: "shirt",
  selectedImage: null, // Initialize selectedImage with null

  // Set the selected image directly
  setSelectedImage: (image) => {
    state.selectedImage = image;
  },
});

export { state }
