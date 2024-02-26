import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

function MovingStars() {
  const starRef = useRef();

  useFrame(() => {
    // Cela déplace les étoiles horizontalement
    // Tu peux ajuster la vitesse de défilement en modifiant la valeur
    starRef.current.rotation.y += 0.0;
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
