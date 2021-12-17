import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ME } from '../queries'
import Books from './Books'

const Recommendations = props => {
  const [user, setUser] = useState(null)
  const result = useQuery(ME)

  useEffect(() => {
    if (result.data && result.data.me != null) {
      setUser(result.data.me)
    } else {
      setUser(null)
    }
  }, [result.data])

  if (!props.show || !user) {
    return null
  }

  return (
    <Books
      title={`recommendations for ${user.username}`}
      hideButtons={true}
      favoriteGenres={user.favoriteGenres}
      show = {props.show}
    />
  )
}

export default Recommendations