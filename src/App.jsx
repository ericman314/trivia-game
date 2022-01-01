import React from 'react'
import './App.css'
import { usePersistantReducer } from './usePersistantReducer'
import reducer from './reducer'
import game from './plan-of-salvation.json'
import { GameBoard } from './GameBoard'
import { Clue } from './Clue'
import { PlayerView } from './PlayerView'
import { Scores } from './Scores'

function App() {

  const [state, dispatch] = usePersistantReducer(reducer, {
  })

  const [view, setView] = React.useState(null)

  const [newPlayerName, setNewPlayerName] = React.useState('')



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

  let roundIndex, categoryIndex, clueIndex
  if (state.selectedClue) {
    for (let i = 0; i < state.game.rounds.length && clueIndex == null; i++) {
      for (let j = 0; j < state.game.rounds[i].categories.length && clueIndex == null; j++) {
        for (let k = 0; k < state.game.rounds[i].categories[j].clues.length; k++) {
          if (state.game.rounds[i].categories[j].clues[k].clue === state.selectedClue.clue) {
            roundIndex = i
            categoryIndex = j
            clueIndex = k
            break
          }
        }
      }
    }
  }



  function handleNextClue() {
    dispatch({ type: 'DESELECTCLUE' })
    dispatch({ type: 'ADJUSTSCORES' })
    dispatch({ type: 'HIDECLUE', clue: state.selectedClue })
  }

  function handleNewPlayer() {
    if (newPlayerName) {
      dispatch({ type: 'NEWPLAYER', name: newPlayerName })
      setNewPlayerName('')
    }
  }

  function handleNewGame() {
    if (window.confirm("Are you sure you want to start a new game?")) {
      dispatch({ type: 'NEWGAME', game })
    }
  }

  if (view === null) {
    return (
      <div className='App'>
        <h2>Select View</h2>
        <button onClick={() => setView('host')}>Host</button>
        <button onClick={() => setView('player')}>Player</button>
      </div>
    )
  } else if (view === 'player') {

    return (
      <div className="App">
        <PlayerView state={state} />
      </div>
    )
  } else if (view === 'host') {
    return (
      <div className="App">
        <div className="halfSize">
          <PlayerView state={state} dispatch={dispatch} />
        </div>
        <div className='halfSizeGutter' />
        <br />
        {state.selectedClue ? <>
          <p>{state.game.rounds[roundIndex].categories[categoryIndex].name}, {state.selectedClue.points}</p>
          <p style={{ border: '2px solid black', display: 'inline-block', padding: 8 }}>Correct response: <b>{state.selectedClue.response}</b></p>
          <p>Adjust scores</p>
          <div className='scores'>
            {state.players.map((player, index) => {
              return <div key={index} className='adjustScore'>
                <div>{player.name}</div>
                <button
                  className={`adjustScoreButton ${player.adjustScorePreview > 0 ? 'selected' : ''}`}
                  style={{ color: '#00cc00' }}
                  onClick={() => {
                    if (player.adjustScorePreview === state.selectedClue.points) {
                      dispatch({ type: 'SETADJUSTSCOREPREVIEW', playerIndex: index, adjustScorePreview: 0 })
                    } else {
                      dispatch({ type: 'SETADJUSTSCOREPREVIEW', playerIndex: index, adjustScorePreview: state.selectedClue.points })
                    }
                  }}
                >+{state.selectedClue.points}</button>
                <button
                  className={`adjustScoreButton ${player.adjustScorePreview < 0 ? 'selected' : ''}`}
                  style={{ color: 'red' }}
                  onClick={() => {
                    if (player.adjustScorePreview === -state.selectedClue.points) {
                      dispatch({ type: 'SETADJUSTSCOREPREVIEW', playerIndex: index, adjustScorePreview: 0 })
                    } else {
                      dispatch({ type: 'SETADJUSTSCOREPREVIEW', playerIndex: index, adjustScorePreview: -state.selectedClue.points })
                    }
                  }}
                >-{state.selectedClue.points}</button>
              </div>
            })}
          </div>
          <button onClick={handleNextClue}>Next Clue</button>
        </> 
        :
          <>
            <Scores state={state} dispatch={dispatch} editable />
            <input type='text' placeholder='Player name' value={newPlayerName} onChange={e => setNewPlayerName(e.target.value)} />
            <button onClick={handleNewPlayer}>Add Player</button>
            <br />
            <br />
            <button onClick={handleNewGame}>New Game</button>
          </>
        }
      </div >
    )
}
}

export default App
