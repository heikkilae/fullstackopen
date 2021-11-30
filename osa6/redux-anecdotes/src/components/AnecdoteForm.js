import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const addNote = event => {
    console.log('addNote', event.target.anecdote.value)
    event.preventDefault()
    dispatch(addAnecdote(event.target.anecdote.value))
    dispatch(setNotification(`You added '${event.target.anecdote.value}'`, 5000))
    event.target.anecdote.value = ''
  }

  return (
    <form onSubmit={addNote}>
      <div><input name="anecdote" /></div>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm