import React from 'react'

export default function ContainerInfo({imgInfo, infoText}) {
  return (
    <div className='containerInfo'>
        <img src={imgInfo} alt="" />
        <p>{infoText}</p>
    </div>
  )
}
