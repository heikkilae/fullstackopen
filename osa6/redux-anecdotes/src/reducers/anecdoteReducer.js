const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

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
      const newAnecdote = {
        id: getId(),
        content: action.content,
        votes: 0
      }
      return state.concat(newAnecdote)
    default: 
    return state
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}

export const voteAnecdote = id => {
  return {
    type: "VOTE",
    id: id
  }
}

export const addAnecdote = anecdote => {
  return {
    type: "ADD",
    content: anecdote
  }
}

export default reducer