import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Color } from 'three';

export default function Spaceship() {
  const spaceshipRef = useRef();
  const { scene } = useGLTF('/SpaceShip.glb');
  const [reactorIntensity, setReactorIntensity] = useState(0); 
  const [colorIntensity, setcolorIntensity] = useState(0); 
  const [targetPositionY, setTargetPositionY] = useState(0); // Déclaration de l'état targetPositionY
  const [enableMouseMove, setEnableMouseMove] = useState(false); // État pour activer/désactiver le contrôle de la souris

  const audioContextRef = useRef(null);
  const [soundLoaded, setSoundLoaded] = useState(false);
  const soundBufferRef = useRef(null);

  useEffect(() => {
    // Initialisation de l'AudioContext
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();

    // Charger le son
    const loadSound = async (url) => {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      audioContextRef.current.decodeAudioData(arrayBuffer, (buffer) => {
        soundBufferRef.current = buffer;
        setSoundLoaded(true); // Indique que le son est chargé et prêt à être joué
      });
    };

    loadSound('/reactor.mp3');
  }, []);

  useEffect(() => {
    // Vérifie si le son est chargé et si l'intensité du réacteur commence à augmenter
    if (soundLoaded && reactorIntensity > 0 && audioContextRef.current && soundBufferRef.current) {
      // Créer une source audio pour le son
      const source = audioContextRef.current.createBufferSource();
      source.buffer = soundBufferRef.current;
      
      // Connecter la source au contexte audio
      source.connect(audioContextRef.current.destination);
      
      // Jouer le son
      source.start(0);
  
      // Optionnel: Empêcher le son de se rejouer en réinitialisant le drapeau
      setSoundLoaded(false);
    }
  }, [reactorIntensity, soundLoaded])


  useEffect(() => {
    // Activer le contrôle de la souris après un délai de 5 secondes
    const timeoutId = setTimeout(() => {
      setEnableMouseMove(true);
    }, 9000);

    return () => clearTimeout(timeoutId);
  }, []);

   useEffect(() => {
      const handleMouseMove = (event) => {
        if (!enableMouseMove) return; // Ignorer le mouvement de la souris si désactivé
        const mouseYPercentage = event.clientY / window.innerHeight;
        // Calcule la position cible en fonction de la position de la souris
        const positionY = (mouseYPercentage - 0.4) * 20;
        setTargetPositionY(positionY);
      };
  
      window.addEventListener('mousemove', handleMouseMove);
  
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, [enableMouseMove]);
  
    useFrame(() => {
      if (spaceshipRef.current) {
        // Applique un effet de "easing" en ajustant la position y du vaisseau
        spaceshipRef.current.position.y += (targetPositionY - spaceshipRef.current.position.y) * 0.1;
      }
    });

  useEffect(() => {
    scene.traverse((objet) => {
      if (objet.isMesh && objet.material.name === "LightReactor") {
        // Initialiser la couleur émissive à noir (pas allumé)
        objet.material.emissive = new Color('#fcf2e1');
        objet.material.emissiveIntensity = reactorIntensity; // Utiliser l'intensité contrôlée par l'état
      }
    });
  }, [scene, reactorIntensity]); // Ajouter reactorIntensity aux dépendances

  // Animation de l'intensité émissive
  useFrame(() => {
    // Augmenter progressivement l'intensité jusqu'à 1 pour simuler l'allumage
    if (reactorIntensity < 2  ) {
      setReactorIntensity(reactorIntensity + 0.009);
      setcolorIntensity(colorIntensity + 100);
    }
    if (colorIntensity < 500  ) {
      setcolorIntensity(colorIntensity + 5);
    }

  });

  return (
  <>
  <pointLight position-z={-15}color={'#ff9c9c'} intensity={colorIntensity}/>
  <primitive ref={spaceshipRef} scale={2} object={scene} position-x={-6} position-z={-5} />;
  </>
  )
  
}

  
   