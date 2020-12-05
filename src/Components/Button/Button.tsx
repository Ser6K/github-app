import React from 'react'
import { ButtonTypes } from './types'

import styles from './Button.module.scss'

const Button:React.FC<ButtonTypes> = ({ type, children }) => {
  return (
    <button
      type={type}
      className={styles.button}
    >
      {children}
    </button>
  )
}

export default Button