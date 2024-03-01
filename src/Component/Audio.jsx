import React, { useEffect, useRef } from 'react';

export default function Audio() {
  const audioContextRef = useRef(null);

  useEffect(() => {
    // Vérifiez si l'API Web Audio est supportée

    if (window.AudioContext || window.webkitAudioContext) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      const gainNode = audioContextRef.current.createGain();
      gainNode.connect(audioContextRef.current.destination);
      gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime); // Commencer à volume 0

      const playAudio = async () => {
        const audioUrl = '/Ambient.mp3'; // Mettez ici le chemin vers votre fichier audio
        const response = await fetch(audioUrl);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
        const source = audioContextRef.current.createBufferSource();
        source.buffer = audioBuffer;

        source.connect(gainNode);


        source.start();

        // Fade in effect
        gainNode.gain.linearRampToValueAtTime(0.05, audioContextRef.current.currentTime + 10); // Fade in sur 5 secondes
      };

      playAudio().catch(error => console.error('Error playing audio:', error));
    }
  }, []);

  return (
    <div></div> // Ce div peut être utilisé pour afficher des contrôles ou des informations sur l'audio
  );
}
