import React from 'react'

export function Clue({ clue, onDeselect }) {
  return (
    clue.picture ?
      <div className='CluePicture'>
        <img src={clue.picture} />
      </div>
      :
      <div className='Clue' >
        <div>{clue.clue}</div>
      </div>
  )
}