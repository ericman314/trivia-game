import React from 'react'

export function Clue({ clue, onDeselect }) {
  return (
    <div className='Clue' onClick={() => onDeselect(clue)}>
      {clue.clue}
    </div>
  )
}