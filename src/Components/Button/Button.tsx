import React from 'react'
import { ButtonTypes } from './types'
import cx from 'classnames'

import styles from './Button.module.scss'

const Button:React.FC<ButtonTypes> = ({ type, onClick, className, children, disabled }) => (
  <button
    type={type}
    className={cx(styles.button, className, { [styles.disabled]: disabled })}
    onClick={onClick}
  >
    {children}
  </button>
)

export default Button