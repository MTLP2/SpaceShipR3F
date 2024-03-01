import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience.jsx';
import Audio from './Component/Audio.jsx';
import Loader from './Component/Loader.jsx';
import ContainerInfo from './Component/ContainerInfo.jsx';

import './style.css'

const App = () => {
    const [isLoaded, setIsLoaded] = useState(false); // Gère l'état de chargement
    const [isStarted, setIsStarted] = useState(false); // Gère l'état de démarrage

    // Simule le chargement des ressources
    useEffect(() => {
        // Simule un chargement asynchrone, remplace ceci par ton vrai chargement
        const timer = setTimeout(() => setIsLoaded(true), 4000); // Ajuste ce délai selon le temps de chargement réel

        return () => clearTimeout(timer);
    }, []);

    const handleStart = () => {
        setIsStarted(true); // L'utilisateur a démarré l'expérience
    };

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            {!isStarted && (
                <div className='buttonstart'>
                    {isLoaded ? (
                        <button className='button' onClick={handleStart}>START</button>
                    ) : (
                        <Loader/>
                    )}
                </div>
            )}
            {isStarted && (
                <>
                    <Canvas
                        camera={{
                            fov: 45,
                            near: 0.1,
                            far: 2000,
                            position: [0.4, 0, -25],
                        }}
                    >
                        <Experience />
                    </Canvas>
                    <Audio />
                    <div className="sectionInfo">
                        <ContainerInfo imgInfo={'/img/photoExp1.png'} infoText={`Avant d'ouvrir Blender, j'ai pris le temps de réfléchir au concept de mon modèle. Cela impliquait de dessiner des esquisses et de réfléchir à la fonctionnalité et à l'esthétique de l'objet dans l'espace 3D. En utilisant les outils de modélisation de Blender, j'ai commencé à créer mon modèle. Cela impliquait l'utilisation de primitives (comme des cubes, sphères, et cylindres) et de techniques de modélisation plus avancées (telles que l'extrusion, la subdivision, et le sculpting) pour donner forme à mon concept. À chaque étape, j'ai constamment vérifié les proportions et l'harmonie générale du modèle.`}/>
                         
                        <ContainerInfo imgInfo={'/img/photoExp2.png'} infoText={`Préparation du Fichier : J'ai veillé à ce que le fichier exporté (généralement au format GLB ou GLTF) soit optimisé pour le web, afin de garantir des temps de chargement rapides et une bonne performance sur les navigateurs.
                        Installation des Dépendances : Dans mon projet React, j'ai installé les packages nécessaires pour utiliser R3F et charger des modèles 3D,notamment @react-three/fiber et @react-three/drei pour des fonctionnalités supplémentaires comme le chargement de modèles.
                        Importation du Modèle dans React : En utilisant le composant useGLTF de @react-three/drei`}/>
                        <ContainerInfo imgInfo={'/img/photoExp3.png'} infoText={`Pour implémenter le suivi de la souris pour contrôler les mouvements d'un vaisseau dans une application React Three Fiber (R3F), j'ai utilisé une combinaison de gestionnaires d'événements de souris et d'état React pour ajuster la position du vaisseau en fonction des mouvements de la souris. Voici comment j'ai procédé :
                        Capture des Mouvements de la Souris : J'ai commencé par ajouter un écouteur d'événements dans le composant principal (ou le <Canvas> de R3F) pour                       détecter les mouvements de la souris. Cela implique d'utiliser onMouseMove pour mettre à jour l'état qui représente la position de la souris.`}/>
                        <ContainerInfo imgInfo={'/img/photoExp4.png'} infoText={`
                        Pour améliorer l'immersion et l'expérience utilisateur dans mon projet React Three Fiber (R3F), j'ai enrichi la scène avec l'ajout soigneusement                        planifié de lumières et d'effets sonores. Les lumières, comprenant à la fois des sources ponctuelles (Point Light) pour simuler des éclairages                      diffus dans toutes les directions, et des lumières directionnelles (Directional Light) pour créer des effets de lumière parallèle imitant le                    soleil, ont été stratégiquement positionnées pour mettre en valeur le vaisseau spatial et d'autres éléments de la scène, ajoutant ainsi profondeur                  et réalisme.`}/>
                    </div>
                </>
            )}
        </div>
    );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />);
