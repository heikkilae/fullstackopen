import React, { useState } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const login = (token) => {
    setToken(token)
    setPage('recommended')
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    // Välimuistin nollaaminen tapahtuu Apollon client-objektin metodilla resetStore, 
    // clientiin taas päästään käsiksi hookilla useApolloClient
    client.resetStore()
  }

  return (
    <div>
      <div style={{display: "flex"}}>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
      {token ? 
        <div>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recommended')}>recommend</button>
          <button onClick={logout}>logout</button>
        </div> 
        : <button onClick={() => setPage('login')}>login</button>}
      </div>

     <LoginForm
        show={page === 'login'}
        setToken={(token) => login(token)}
        setError={(message) => console.log('Login error', message)}
      />

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <Recommendations
        show={page === 'recommended'}
      />

      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}

export default App