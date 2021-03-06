import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import AuthorForm from './AuthorForm'

const Authors = (props) => {
  const [authors, setAuthors] = useState(null)
  const result = useQuery(ALL_AUTHORS)

  useEffect(() => {
    if (result.data && result.data.allAuthors !== null) {
      setAuthors(result.data.allAuthors)
    } else {
      setAuthors([])
    }
  }, [result.data])

  useEffect(() => {
    if (props.show) {
      result.refetch()
    }
  }, [props.show]) // eslint-disable-line
  
  if (!props.show || !authors) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <AuthorForm show={true} authors={authors} />
    </div>
  )
}

export default Authors