import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { VStack, Button, Box } from '@chakra-ui/react'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <VStack w='full' alignItems='flex-start' spacing={3}>
      <Button w='xs'
        variant='outline'
        onClick={toggleVisibility}>
        {visible ? 'cancel' : props.buttonLabel}
      </Button>
      <Box w='full' style={showWhenVisible}>
        {props.children}
      </Box>
    </VStack>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable