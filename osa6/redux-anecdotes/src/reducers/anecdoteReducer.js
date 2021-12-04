import andicdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE':
      return state.map(a => a.id === action.content.id ? action.content : a)
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
  return async dispatch => {
    const anecdotes = await andicdoteService.getAll()
    const anecdoteToChange = anecdotes.find(n => n.id === id)
    const changedAnecdote = { 
      id: anecdoteToChange.id,
      content: anecdoteToChange.content, 
      votes: anecdoteToChange.votes + 1
    }

    const updatedAnecdote = await andicdoteService.update(changedAnecdote)

    dispatch({
      type: "VOTE",
      content: updatedAnecdote
    })
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