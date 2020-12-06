import React from 'react'
import { ResultContainerTypes } from './types'

import Spinner from 'src/components/Spinner'

import styles from './ResultContainer.module.scss'

const ResultContainer: React.FC<ResultContainerTypes> = ({
  isLoading = false,
  showLoadingIndicator = true,
  showMessage = false,
  messageText = 'Result is empty!',
  children
}): any => {
  let elementContent = null

  if (isLoading && showLoadingIndicator) {
    elementContent = (
      <div className={styles.centered}>
        <Spinner />
      </div>
    )
  } else if (!isLoading && showMessage) {
    elementContent = (
      <div className={styles.centered}>
        <p className={styles.message}>{messageText}</p>
      </div>
    )
  } else if (!isLoading && !showMessage) {
    elementContent = children
  }

  return elementContent
}

export default ResultContainer
