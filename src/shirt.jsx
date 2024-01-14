import React, { useRef, useEffect } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { state } from "./store";
import * as THREE from "three";
import { PlaneGeometry, MeshBasicMaterial } from "three"; // Import BoxGeometry

export function Shirt(props) {
  const { nodes, materials } = useGLTF("/shirt_baked_collapsed.glb");
  const snap = useSnapshot(state);
  const shirtMaterialRef = useRef();
 const overlayMaterialRef = useRef();

   const selectedImage = props.selectedImage;

   const texture = useTexture(selectedImage || "./three2.png");
   
  useEffect(() => {
    if (shirtMaterialRef.current) {
      shirtMaterialRef.current.userData.color = snap.color;
    }
  }, [snap.color]);
  
  return (
    <group {...props} dispose={null}>
      <group position={[0.01, 0.06, 0.169]}>
        <mesh
          scale={0.25}
          ref={overlayMaterialRef}
          castShadow
          receiveShadow
          geometry={new THREE.PlaneGeometry(1, 1)}
          material={
            new THREE.MeshBasicMaterial({
              map: texture,
              transparent: true,
            })
          }
          // Adjust the position along the z-axis
        />
      </group>
      <mesh
        scale={1.25}
        position={[0, 0, 0]}
        ref={shirtMaterialRef}
        castShadow
        receiveShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-color={snap.color}
      />
    </group>
  );
}

useGLTF.preload("/shirt_baked_collapsed.glb");
