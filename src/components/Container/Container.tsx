import React from 'react'

import SearchForm from 'src/components/SearchForm'

import { ContainerTypes } from './types'

import styles from './Container.module.scss'

const Container:React.FC<ContainerTypes> = ({ children }) => (
  <div className={styles.container}>
    <SearchForm />
    {children}
  </div>
)

export default Container
