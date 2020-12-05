import React from 'react'
import { ButtonTypes } from './types'

import styles from './Button.module.scss'

const Button:React.FC<ButtonTypes> = ({ type, onClick, children }) => {
  return (
    <button
      type={type}
      className={styles.button}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button