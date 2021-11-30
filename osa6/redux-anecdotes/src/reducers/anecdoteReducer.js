import andicdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE':
      const id = action.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = { 
        content: anecdoteToChange.content, 
        votes: anecdoteToChange.votes + 1
      }
      return state.map(a => a === anecdoteToChange ? changedAnecdote : a)
    case 'ADD':
      return [...state, action.content]
    default: 
    return state
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await andicdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const voteAnecdote = id => {
  return {
    type: "VOTE",
    id: id
  }
}

export const addAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await andicdoteService.createNew(anecdote)
    dispatch({
      type: "ADD",
      content: newAnecdote
    })
  }
}

export default reducer