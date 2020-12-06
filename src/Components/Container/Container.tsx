import React from 'react'
import { ContainerTypes } from './types'

import SearchForm from 'src/components/SearchForm'

import styles from './Container.module.scss'

const Container:React.FC<ContainerTypes> = ({ children }) => (
  <div className={styles.container}>
    <SearchForm />
    {children}
  </div>
)

export default Container
