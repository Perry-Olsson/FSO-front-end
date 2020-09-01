import { useState, useEffect } from 'react'


export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => { setValue(event.target.value) }

  const onReset = () => { setValue('') }

  useEffect(() => {
    const button = document.getElementById('reset')
    button.addEventListener('click', onReset)
  }, [])

  return {
    type,
    value,
    onChange
  }
}