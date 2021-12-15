import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'
import Select from 'react-select'

const AuthorForm = (props) => {
  const [selectedName, setSelectedName] = useState(null);
  const [born, setBorn] = useState('')

  const  [createBook] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  if (!props.show || !props.authors) {
    return null
  }

  const options = props.authors.map(a => {
    return { value: a.name, label: a.name }
  })

  const submit = async (event) => {
    event.preventDefault()

    createBook({
      variables: {
        name: selectedName.value,
        born: Number(born)
      }
    })
    setBorn('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
           name
           <Select
            value={selectedName}
            defaultValue={selectedName}
            onChange={setSelectedName}
            options={options}
          />
        </div>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default AuthorForm
