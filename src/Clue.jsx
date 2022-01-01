import React from 'react'

export function Clue({ clue, onDeselect }) {
  return (
    <div className='Clue' >
      {clue.clue}
    </div>
  )
}