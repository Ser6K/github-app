import React from 'react'
import { createPortal } from 'react-dom'
import { ModalTypes } from './types'

import styles from './Modal.modules.scss'

const Modal: React.FC<ModalTypes> = ({ onClose, children }) => {
  return createPortal(
    <div className={styles.modal}>
      {children}
    </div>,
    document.body
  )
}

export default Modal