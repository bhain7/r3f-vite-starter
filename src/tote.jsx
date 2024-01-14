import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { state } from "./store";
import { PlaneGeometry, MeshBasicMaterial } from "three"; // Import BoxGeometry
import * as THREE from "three";

export function Tote(props) {
  const { nodes, materials } = useGLTF("/totee.glb");
  const snap = useSnapshot(state);
  const toteMaterialRef = useRef();
  const overlayMaterialRef = useRef();

   const selectedImage = props.selectedImage;

   const texture = useTexture(selectedImage || "./three2.png");
  useFrame((state, delta) => {
    if (toteMaterialRef.current) {
      toteMaterialRef.current.color.set(snap.color);
    }
  });

  return (
    <group {...props} dispose={null} position={[0, -0.4, -0.15]} scale={1.55}>
      <mesh
        position={[0.01, 0.25, 0.12]}
        scale={[0.2, 0.2, 0.2]}
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

      <mesh
        castShadow
        receiveShadow
        geometry={nodes["tote-bag"].geometry}
        material={materials.None}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial
          ref={toteMaterialRef}
          attach="material"
          color={snap.color}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/totee.glb");
