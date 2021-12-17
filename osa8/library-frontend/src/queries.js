import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`
export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author {
        name
      }
    }
  }
`
export const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [String!]) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      id
      title
      published
      author {
        name
      }
    }
  }
`
export const EDIT_AUTHOR = gql`
  mutation EditAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born) {
      name
      born
    }
  }
`
