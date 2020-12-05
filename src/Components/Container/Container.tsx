import React from 'react'
import { ContainerTypes } from './types'

import styles from './Container.module.scss'

const Container:React.FC<ContainerTypes> = ({ isEmpty, isLoading, children }) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}

export default Container
