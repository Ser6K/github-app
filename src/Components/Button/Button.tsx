import React from 'react'
import { ButtonTypes } from './types'
import cx from 'classnames'

import styles from './Button.module.scss'

const Button:React.FC<ButtonTypes> = ({ type, onClick, className, children }) => (
  <button
    type={type}
    className={cx(styles.button, className)}
    onClick={onClick}
  >
    {children}
  </button>
)

export default Button