import React from 'react'
import './App.css'
import { usePersistantReducer } from './usePersistantReducer'
import reducer from './reducer'
import game from './plan-of-salvation.json'
import { GameBoard } from './GameBoard'
import { Clue } from './Clue'

function App() {

  const [state, dispatch] = usePersistantReducer(reducer, {
  })

  // React.useEffect(() => {
  //   dispatch({ type: 'NEWGAME', game })
  // }, [])

  // for (let round of game.rounds) {
  //   for (let category of round.categories) {
  //     console.log(`Category: ${category.name} ${category.description ? `(${category.description})` : ''}`)
  //     for (let clue of category.clues) {
  //       console.log(`Question: ${clue.clue}`)
  //       console.log(`Answer: ${clue.response}`)
  //       console.log('')
  //     }
  //   }
  // }

  function handleSelect(clue) {
    dispatch({ type: 'SELECTCLUE', clue })
  }

  function handleDeselect(clue) {
    dispatch({ type: 'HIDECLUE', clue })
    dispatch({ type: 'DESELECTCLUE' })
  }

  return (
    <div className="App">
      {state.game ?
        (state.selectedClue ?
          <Clue clue={state.selectedClue} onDeselect={handleDeselect} />
          :
          <GameBoard game={state.game} roundIndex={state.roundIndex} onSelect={handleSelect} />
        )
        :
        <button onClick={() => dispatch({ type: 'NEWGAME', game })}>New Game</button>
      }
    </div>
  )
}

export default App
