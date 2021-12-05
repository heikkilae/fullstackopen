import { useState } from 'react'

export const useField = (name) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  const withoutReset = {
    name,
    value,
    onChange
  }

  return {
    name,
    value,
    onChange,
    reset,
    withoutReset
  }
}

// moduulissa voi olla monta nimettyä eksportia
export const useAnotherHook = () => {
  return {
    useField
  }
}