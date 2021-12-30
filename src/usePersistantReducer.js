import React from 'react'

export function usePersistantReducer(reducer, initialState, key = 'state') {

  const [state, dispatch] = React.useReducer(reducer, initialState)

  // Keeps track of the number of actions dispatched from this instance.
  const refCounter = React.useRef(-1)
  const refLastCounter = React.useRef(-1)

  // When the caller dispatches an action, increment the counter so that the state will be updated.
  const observableDispatch = React.useMemo(() => {
    return (action) => {
      dispatch(action)
      // Don't update the state if using the 'RESET' action, as that will cause an infinite loop between two or more instances.
      if (action.type !== 'RESET') {
        refCounter.current++
      }
    }
  }, [])

  // Load the initial state from localStorage
  React.useEffect(() => {
    const { data } = getItem(key)
    if (data) {
      dispatch({ type: 'RESET', payload: data })
    }
  }, [])

  // If state changes, save it to localStorage but only if the counter has increased (indicating the caller dispatched an action).
  React.useEffect(() => {
    if (refCounter.current !== refLastCounter.current) {
      refLastCounter.current = refCounter.current
      setItem(state, key)
    }
  }, [state])

  // If localStorage changes, update the state (the RESET action won't increment the counter).
  React.useEffect(() => {
    const updateStateFromLocalStorage = () => {
      const { data } = getItem(key)
      if (data) {
        dispatch({ type: 'RESET', payload: data })
      }
    }

    window.addEventListener('storage', updateStateFromLocalStorage)

    return () => {
      window.removeEventListener('storage', updateStateFromLocalStorage)
    }
  }, [])

  return [state, observableDispatch]
}

function setItem(data, key) {
  localStorage.setItem(key, JSON.stringify({ data }))
}

function getItem(key) {
  try {
    let data = localStorage.getItem(key)
    if (data) {
      return JSON.parse(localStorage.getItem(key))
    } else {
      return { data: null }
    }
  } catch (ex) {
    return { data: null }
  }
}