import React, { useState } from 'react'

import cx from 'classnames'

import { InputTypes } from './types'

import styles from './Input.module.scss'

const Input:React.FC<InputTypes> = ({ type, value = '', onValueChange, className, ...props }) => {
  const [inputValue, setInputValue] = useState(value)

  if (type === 'textarea') {
    return (
      <textarea
        {...props}
        className={cx(styles.textarea, className)}
        onChange={handleChangeInput}
        value={inputValue}
      />
    )
  }

  return (
    <input
      {...props}
      type={type}
      className={cx(styles.input, className)}
      onChange={handleChangeInput}
      value={inputValue}
    />
  )

  function handleChangeInput(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (typeof onValueChange !== 'function') {
      return
    }

    const { value: newValue } = event.target

    setInputValue(newValue)
    onValueChange(newValue)
  }
}

export default Input