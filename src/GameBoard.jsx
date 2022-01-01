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
          <div key={category.name} className='CategoryName'>{category.name}</div>
          {category.clues.map((clue, index) => {
            if (clue.hidden) {
              return <div key={index} className='PointValue' />
            } else {
              return (
                <div key={index} className='PointValue' onClick={() => onSelect(clue)}>
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