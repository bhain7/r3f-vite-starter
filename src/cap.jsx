import React, { useRef, useEffect } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { state } from "./store";
import { PlaneGeometry, MeshBasicMaterial } from "three"; // Import BoxGeometry
import * as THREE from "three";

export function Cap(props) {
  const { nodes, materials } = useGLTF("/cap.glb");
  const snap = useSnapshot(state);
  const capMaterialRef = useRef();
  const overlayMaterialRef = useRef();  
   const selectedImage = props.selectedImage;

   const texture = useTexture(selectedImage || "./three2.png");
  useEffect(() => {
    if (capMaterialRef.current) {
      capMaterialRef.current.userData.color = snap.color;
    }
  }, [snap.color]);

  return (
    <group {...props} dispose={null} position={[0, -0.24, 0.15]} scale={3.15}>
      <group position={[0.01, 0.09, 0.08]}>
        <mesh
          scale={0.07}
          ref={overlayMaterialRef}
          castShadow
          receiveShadow
          geometry={new THREE.PlaneGeometry(1, 1)}
          material={
            new THREE.MeshBasicMaterial({
              color: 0xffffff,
              map: texture,
              transparent: true,
            })
          }
          // Adjust the position along the z-axis
        />
      </group>
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          position={[0, 0, 0]}
          ref={capMaterialRef}
          castShadow
          receiveShadow
          geometry={nodes.visor_1.geometry}
          material={materials.Default}
          material-color={snap.color}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.visor_2.geometry}
          material={materials.lambert1}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/cap.glb");
