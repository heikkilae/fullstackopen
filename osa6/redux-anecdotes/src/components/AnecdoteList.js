import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeAnecdotes, voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdotesService from '../services/anecdotes'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  useEffect(() => {
    anecdotesService
    .getAll()
    .then(anecdotes => dispatch(initializeAnecdotes(anecdotes)))
  }, [dispatch])
  
  const vote = id => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
    dispatch(setNotification(`You voted '${anecdotes.find(a => a.id === id).content}'`))
    setTimeout(() => {
      dispatch(setNotification(''))
    }, 5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}


export default AnecdoteList