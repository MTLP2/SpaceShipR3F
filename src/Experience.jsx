import { Stars,Float,Stage , OrbitControls } from '@react-three/drei'
import Spaceship from './Component/Spaceship'


export default function Experience()
{

    return <>

        <color args={['black'] } attach={'background'} />

        <OrbitControls makeDefault />

        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={10} />

        <Stage
        shadows={false}
        >
            <Float
             floatIntensity={10}
             speed={5}
             >
                
                <Spaceship /> 
            </Float>

            
        </Stage>
        
    </>
}