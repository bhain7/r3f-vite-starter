import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useTexture, AccumulativeShadows, RandomizedLight, Decal, Environment, Center } from '@react-three/drei'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import { state } from './store'
import React, { useMemo } from "react";
import * as THREE from "three";
import { Mug } from "./mug";
import { Cap } from "./cap";
import { Tote } from "./tote";
import { Shirt } from "./shirt"



export const App = ({
  selectedImage,
  componentToRender,
  position = [0, 0, 0],
  fov = 25,
}) => (
  <Canvas
    style={{ height: "100vh", width: "100vw" }}
    shadows
    camera={{ position, fov }}
    gl={{ preserveDrawingBuffer: true }}
    eventSource={document.getElementById("root")}
    eventPrefix="client"
  >
    <ambientLight intensity={0.5} />
    <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" />
    <CameraRig>
      <Backdrop />
      <Center>
        {componentToRender === "Module1" ? (
          <Shirt selectedImage={selectedImage} />
        ) : componentToRender === "Module2" ? (
          <Mug selectedImage={selectedImage} />
        ) : componentToRender === "Module3" ? (
          <Cap selectedImage={selectedImage} />
        ) : componentToRender === "Module4" ? (
          <Tote selectedImage={selectedImage} />
        ) : null}
      </Center>
    </CameraRig>
  </Canvas>
);

function Backdrop() {
  const shadows = useRef()
  useFrame((state, delta) => easing.dampC(shadows.current.getMesh().material.color, state.color, 0.25, delta))
  return (
    <AccumulativeShadows ref={shadows} temporal frames={60} alphaTest={0.85} scale={10} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.14]}>
      <RandomizedLight amount={4} radius={9} intensity={0.55} ambient={0.25} position={[5, 5, -10]} />
      <RandomizedLight amount={4} radius={5} intensity={0.25} ambient={0.55} position={[-5, 5, -9]} />
    </AccumulativeShadows>
  )
}

function CameraRig({ children }) {
  const group = useRef();
  const snap = useSnapshot(state);
  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [0, 0, 3], 0.25, delta);
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta
    );
  });
  return (
    <group ref={group} position={[0, 0, 0]}>
      {children}
    </group>
  );
}
useGLTF.preload('/shirt_baked_collapsed.glb')
;['/react.png', '/three2.png', '/pmndrs.png'].forEach(useTexture.preload)
