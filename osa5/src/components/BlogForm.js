import React from 'react'

const BlogForm = ({ newTitle, newAuthor, newUrl, handleNewTitle, 
  handleNewAuthor, handleNewUrl, handleSubmit }) => (
  <div>
    <h2>create new</h2>
    <form>
      <div>
        title: <input value={newTitle} onChange={handleNewTitle} />
      </div>
      <div>
        author: <input value={newAuthor} onChange={handleNewAuthor} />
      </div>
      <div>
        url: <input value={newUrl} onChange={handleNewUrl} />
      </div>
      <div>
        <button type="submit" onClick={handleSubmit}>create</button>
      </div>
    </form>
  </div>
)

export default BlogForm

