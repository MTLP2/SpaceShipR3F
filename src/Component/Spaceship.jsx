import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';


export default function Spaceship() {
    const spaceshipRef = useRef();
    const [targetPositionY, setTargetPositionY] = useState(0);
  
    useEffect(() => {
      const handleMouseMove = (event) => {
        const mouseYPercentage = event.clientY / window.innerHeight;
        // Calcule la position cible en fonction de la position de la souris
        const positionY = (mouseYPercentage - 0.4) * 30;
        setTargetPositionY(positionY);
      };
  
      window.addEventListener('mousemove', handleMouseMove);
  
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, []);
  
    useFrame(() => {
      if (spaceshipRef.current) {
        // Applique un effet de "easing" en ajustant la position y du vaisseau
        spaceshipRef.current.position.y += (targetPositionY - spaceshipRef.current.position.y) * 0.1;
      }
    });
  
    const { scene } = useGLTF('/SpaceShip.glb');
    return <primitive ref={spaceshipRef} object={scene} position={[0, 5, 0]} />;
  }
  
