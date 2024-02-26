import { Float, Stage, OrbitControls } from '@react-three/drei';
import Spaceship from './Component/Spaceship';
import MovingStars from './Component/Stars';

export default function Experience() {


  return (
    <>
      <color args={['#0f0f0f']} attach="background" />

      <OrbitControls makeDefault />

      <MovingStars />

      <Stage shadows={false}>
        <Float floatIntensity={30} speed={10} >
          <Spaceship />
        </Float>
      </Stage>
    </>
  );
}
