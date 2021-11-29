import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const addNote = event => {
    console.log('addNote', event.target.anecdote.value)
    event.preventDefault()
    dispatch(addAnecdote(event.target.anecdote.value))
  }

  return (
    <form onSubmit={addNote}>
      <div><input name="anecdote" /></div>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm