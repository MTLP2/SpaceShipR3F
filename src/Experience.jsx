import React, { useEffect, useRef, useState } from 'react';
import { Float, Html } from '@react-three/drei';
import Spaceship from './Component/Spaceship';
import MovingStars from './Component/Stars';
import gsap from 'gsap';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';


export default function Experience() {
  const [speedFloat, setspeedFloat] = useState(0)
  const { camera, gl } = useThree();
  const textRef = useRef();
  const timeline = gsap.timeline();

  useFrame(()=>{
    gsap.to(textRef.current, {
      y: 200,
      color:'yellow',
      opacity:1,
      duration: 3,
      delay: 7

    });
  })

  useEffect(() => {
    // Objet pour l'animation
    const floatAnim = { value: 0 };

    // Définit un délai avant de commencer l'effet de flottement
    const timeoutId = setTimeout(() => {
      // Utilise GSAP pour animer l'objet floatAnim
      gsap.to(floatAnim, {
        onUpdate: () => setspeedFloat(1), // Met à jour speedFloat progressivement
      });
    }, 5000); // Délai de 5 secondes

    return () => clearTimeout(timeoutId); // Nettoie le timeout si le composant est démonté
  }, []);


  const lookAtTarget = useRef(new Vector3(0, 0, 1));

  useEffect(() => {
    // Animer la position de la cible
    gsap.to(lookAtTarget.current, {
      x: 20, // Nouvelle position en x vers laquelle tu veux que la caméra regarde
      y: 5,  // Nouvelle position en y
      z: 8, // Nouvelle position en z
      duration: 2,
      delay:4,
      ease: "power1.inOut",
      onUpdate: () => {
        // À chaque mise à jour de l'animation, ajuste la caméra pour regarder vers la cible
        camera.lookAt(lookAtTarget.current);
      },
    });

    
  }, [camera]);

  

  useEffect(() => {
    // Créer une timeline GSAP

    // Exemple d'animation: déplace la caméra sur l'axe Z
    timeline.to(camera.position, {
      x: -60,
      y: 5,
      duration: 5,
      ease: "power1.inOut",
      delay: 4,
      
      // Tu peux aussi ajuster 'y', 'x', ou d'autres propriétés
    });
  
    // Tu peux ajouter d'autres animations à la timeline ici

  }, [camera]);


  return (
    <>
      <color args={['#0f0f0f']} attach="background" />




      <MovingStars />


        <directionalLight intensity={3} position-y={2}/>
        <pointLight color={'white'} intensity={5000} position-y={30} position-z={40}/>
        <Float floatIntensity={10} speed={speedFloat}   >
          <Spaceship />
        </Float>
        <Html position-y={30} position-x={20} position-z={100} transform scale={1.5}>
          <div ref={textRef}  style={{ transform: 'scale(-10, 10)', color: "white", textAlign:'center', opacity:0}}>
            <h1 >SPACESHIP <br /> EXPERIENCE</h1>
          </div>
        </Html>


    </>
  );
}
