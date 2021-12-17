
import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries' 
import { removeDuplicates } from '../utils/helper'

const Books = (props) => {
  const [ books, setBooks ] = useState(null)
  const [ selectedGenre, setSelectedGenre ] = useState('')
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre ? selectedGenre : null }
  })

  useEffect(() => {
    if (result.data && result.data.allBooks !== null) {
      setBooks(result.data.allBooks)
    } else {
      setBooks([])
    }
  }, [result.data])

  useEffect(() => {
    result.refetch()
  }, [selectedGenre]) // eslint-disable-line

  if (!props.show || !books) {
    return null
  }

  const genres = removeDuplicates(books.flatMap(book => book.genres))

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres.map(genre =>
        <button key={genre} onClick={() => setSelectedGenre(genre)}>{genre}</button>
      )}
      <button onClick={() => setSelectedGenre('')}>all genres</button>
    </div>
  )
}

export default Books