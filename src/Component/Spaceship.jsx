import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Spaceship() {
    const { scene } = useGLTF('/SpaceShip.glb')
  return (
    <primitive object={scene } position-y={5}/>
  )
}
