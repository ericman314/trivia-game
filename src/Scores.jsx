import React from 'react'

export function Scores({ state, dispatch, editable }) {
  return (
    <div className='scores'>
      {state.players.map((player, index) => {
        return <div>
          <div key={index}>{player.name}</div>
          {editable ?
            <input type='text' value={Number.isNaN(player.score) ? '' : player.score} size={5} onChange={e => dispatch({ type: 'SETSCORE', playerIndex: index, score: parseInt(e.target.value) })} />
            :
            <div className='yellow'>{Number.isNaN(player.score) ? '' : player.score}</div>
          }
        </div>
      })}
    </div>
  )
}