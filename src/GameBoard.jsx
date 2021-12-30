import React from 'react'
import './GameBoard.css'

export function GameBoard({ game, roundIndex, onSelect }) {
  let numberCategories = game.rounds[roundIndex].categories.length
  let numberClues = game.rounds[roundIndex].categories[0].clues.length


  let style = {
    gridTemplateColumns: `repeat(${numberCategories}, 1fr)`,
    gridTemplateRows: `repeat(${numberClues + 1}, 1fr)`
  }
  return (
    <div className='GameBoard' style={style}>
      {game.rounds[roundIndex].categories.map(category => {
        return <>
          <div className='CategoryName'>{category.name}</div>
          {category.clues.map(clue => {
            if (clue.hidden) {
              return <div className='PointValue' />
            } else {
              return (
                <div className='PointValue' onClick={() => onSelect(clue)}>
                  {clue.points}
                </div>
              )
            }
          })}
        </>
      })}
    </div >
  )
}