import React from 'react'
import { Clue } from './Clue'
import { GameBoard } from './GameBoard'
import './PlayerView.css'
import { Scores } from './Scores'

export function PlayerView({ state, dispatch }) {

  function handleSelect(clue) {
    if (dispatch) {
      dispatch({ type: 'SELECTCLUE', clue })
    }
  }

  return (
    state.game ?
      (state.selectedClue ?
        <Clue clue={state.selectedClue} />
        :
        <div className='PlayerView'>
          <GameBoard game={state.game} roundIndex={state.roundIndex} onSelect={handleSelect} />
          <Scores state={state} />
        </div>
      )
      :
      <p>Waiting for host to start game</p>
  )
}