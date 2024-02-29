import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience.jsx';
import Audio from './Component/Audio.jsx';
import Loader from './Component/Loader.jsx';
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
                </>
            )}
        </div>
    );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />);
