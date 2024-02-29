import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

function MovingStars() {
  const starRef = useRef();
  const [startRotating, setStartRotating] = useState(false);


  useEffect(() => {
    // Définit un délai avant de commencer la rotation
    const timeoutId = setTimeout(() => {
      setStartRotating(true);
    }, 9000); // Délai de 5 secondes

    return () => clearTimeout(timeoutId); // Nettoie le timeout si le composant est démonté
  }, []);

  useFrame(() => {
    if (startRotating) {
      // Une fois le délai passé, commence à augmenter la rotation
      starRef.current.rotation.y += 0.04;
    }
  });

  return (
    <Stars
      ref={starRef}
      radius={700} // Rayon de la sphère sur laquelle les étoiles sont réparties
      depth={20} // Profondeur des étoiles (plus c'est grand, plus les étoiles semblent éloignées)
      count={10000} // Nombre d'étoiles
      factor={30} // Taille des étoiles
      saturation={100} // Saturation des couleurs des étoiles
      fade // Fait disparaître les étoiles les plus éloignées plus doucement
      speed={1}
    />
  );
}

export default MovingStars;
