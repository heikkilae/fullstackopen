import React, { useState } from 'react'
import {
  VStack,
  Heading,
  FormLabel,
  Input,
  Button,
  FormControl
} from '@chakra-ui/react'

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

  const inputStyle = {
    bg: 'white'
  }

  return (
    <VStack alignItems='flex-start'  bg='gray.50' borderRadius='xl' p='5' spacing={3}>
      <Heading as='h3' size='lg'>create new</Heading>
      <VStack w='xs' maxW='full' spacing={3}>
        <FormControl>
          <FormLabel>title:</FormLabel>
          <Input id='title'value={newTitle} onChange={handleNewTitle} {...inputStyle} />
        </FormControl>
        <FormControl>
          <FormLabel>author:</FormLabel>
          <Input id='author' value={newAuthor} onChange={handleNewAuthor} {...inputStyle}/>
        </FormControl>
        <FormControl>
          <FormLabel>url:</FormLabel>
          <Input id='url' value={newUrl} onChange={handleNewUrl} {...inputStyle}/>
        </FormControl>
        <FormControl>
          <Button id='create-button' w='xs' type="submit" variant='outline' onClick={create}>create</Button>
        </FormControl>
      </VStack>
    </VStack>
  )
}

export default BlogForm

