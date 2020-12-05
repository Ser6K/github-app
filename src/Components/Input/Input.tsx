import React, { useState } from 'react'
import { InputTypes } from './types'

import styles from './Input.module.scss'

const Input:React.FC<InputTypes> = ({ type, value = '', onValueChange }) => {
  const [inputValue, setInputValue] = useState(value)

  return (
    <input
      type={type}
      className={styles.input}
      onChange={handleChangeInput}
      value={inputValue}
    />
  )

  function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
    if (typeof onValueChange !== 'function') {
      return
    }

    const { value: newValue } = event.target

    setInputValue(newValue)
    onValueChange(newValue)
  }
}

export default Input