import React, { useEffect } from 'react';
import  SplitType  from 'split-type'; // Correction ici : importation avec des accolades
import { gsap } from 'gsap';

export default function Loader() {
  useEffect(() => {
    // Assurez-vous que l'élément '#my-text' est monté avant d'exécuter ce code
    const myText = new SplitType('#my-text');
    const timeline = new gsap.timeline()

    timeline.to('.char', {
        y: 0,
        stagger: 0.2,
        delay: 0.2,
        duration : 0
    })

    // Vous pouvez ajouter ici d'autres opérations avec `myText` ou `gsap`
  }, []); // Ajout d'un tableau de dépendances vide pour exécuter une seule fois

  return <div className='Loader' >
    
    <h2 id='my-text'>THREEJS-PROJECT</h2>
    </div>;
}
