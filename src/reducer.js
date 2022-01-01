import update from 'immutability-helper'

export default (state, action) => {

  console.log(action)

  switch (action.type) {
    case 'RESET':
      {
        return action.payload
      }
    case 'NEWGAME':
      {
        return update(state, {
        game: { $set: action.game },
          players: { $set: [] },
          selectedClue: { $set: null },
        roundIndex: { $set: 0 }
      })
      }
    case 'SELECTCLUE':
      {
        return update(state, {
        selectedClue: { $set: action.clue }
        })
      }

    case 'DESELECTCLUE':
      {
        return update(state, {
        selectedClue: { $set: null }
      })
      }
    case 'HIDECLUE':
      {// Find the clue in our state, and hide it
      let roundIndex, categoryIndex, clueIndex
      for (let i = 0; i < state.game.rounds.length && clueIndex == null; i++) {
        for (let j = 0; j < state.game.rounds[i].categories.length && clueIndex == null; j++) {
          for (let k = 0; k < state.game.rounds[i].categories[j].clues.length; k++) {
            if (state.game.rounds[i].categories[j].clues[k].clue === action.clue.clue) {
              roundIndex = i
              categoryIndex = j
              clueIndex = k
              break
            }
          }
        }
      }
      return update(state, {
        game: {
          rounds: {
            [roundIndex]: {
              categories: {
                [categoryIndex]: {
                  clues: {
                    [clueIndex]: {
                      hidden: { $set: true }
                    }
                  }
                }
              }
            }
          }
        }
      })
      }

    case 'NEWPLAYER':
      {
        return update(state, {
          players: {
            $push: [{
              name: action.name,
              score: 0,
              adjustScorePreview: 0
            }]
          }
        })
      }
    case 'SETADJUSTSCOREPREVIEW':
      {
        return update(state, {
          players: {
            [action.playerIndex]: {
              adjustScorePreview: { $set: action.adjustScorePreview }
            }
          }
        })
      }
    case 'RESETADJUSTSCOREPREVIEW':
      {
        let stateUpdateObject = { players: {} }
        for (let i = 0; i < state.players.length; i++) {
          stateUpdateObject.players[i] = { adjustScorePreview: { $set: 0 } }
        }
        return update(state, stateUpdateObject)
      }
    case 'ADJUSTSCORES':
      {
        let stateUpdateObject = { players: {} }
        for (let i = 0; i < state.players.length; i++) {
          stateUpdateObject.players[i] = {
            score: { $set: state.players[i].score + state.players[i].adjustScorePreview },
            adjustScorePreview: { $set: 0 }
          }
        }
        return update(state, stateUpdateObject)
      }

    case 'SETSCORE':
      {
        return update(state, {
          players: {
            [action.playerIndex]: {
              score: { $set: action.score }
            }
          }
        })
      }

    case 'INCREMENT':
      {
        return update(state, {
        counter: {
          $set: state.counter + 1
        }
      })
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}