import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ModalTypes } from './types'

import styles from './Modal.modules.scss'

const Modal: React.FC<ModalTypes> = ({ onClose, children }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return createPortal(
    <div className={styles.modal}>
      <div className={styles['modal-content']}>
        {children}
      </div>
      <div className={styles.overlay} onClick={onClose} />
    </div>,
    document.body
  )

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      onClose()
    }
  }
}

export default Modal