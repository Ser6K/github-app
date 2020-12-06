import React from 'react'

import cx from 'classnames'

import { ButtonTypes } from './types'

import styles from './Button.module.scss'

const Button:React.FC<ButtonTypes> = ({ type, onClick, className, children, disabled, color = '' }) => (
  <button
    type={type}
    className={cx(styles.button, className, { [styles.disabled]: disabled, [styles[color]]: color.length > 0 })}
    onClick={onClick}
  >
    {children}
  </button>
)

export default Button