import React, { useState } from 'react'

const BlogForm = ({ handleSubmit }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleNewTitle = (event) => {
    setNewTitle(event.target.value)
  }

  const handleNewAuthor = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleNewUrl = (event) => {
    setNewUrl(event.target.value)
  }

  const create = (event) => {
    event.preventDefault()

    handleSubmit({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form>
        <div>
          title: <input id='title' value={newTitle} onChange={handleNewTitle} />
        </div>
        <div>
          author: <input id='author' value={newAuthor} onChange={handleNewAuthor} />
        </div>
        <div>
          url: <input id='url' value={newUrl} onChange={handleNewUrl} />
        </div>
        <div>
          <button id='create-button' type="submit" onClick={create}>create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm

