import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const addNote = event => {
    console.log('addNote', event.target.anecdote.value)
    event.preventDefault()
    props.addAnecdote(event.target.anecdote.value)
    props.setNotification(`You added '${event.target.anecdote.value}'`, 5000)
    event.target.anecdote.value = ''
  }

  return (
    <form onSubmit={addNote}>
      <div><input name="anecdote" /></div>
      <button type="submit">create</button>
    </form>
  )
}

// export default AnecdoteForm
export default connect(
  null,
  { addAnecdote, setNotification }
)(AnecdoteForm)