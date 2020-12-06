import React from 'react'
import { ContainerTypes } from './types'

import SearchForm from 'src/components/SearchForm'

import styles from './Container.module.scss'

const Container:React.FC<ContainerTypes> = ({ children, onFormSubmit }) => {
  return (
    <div className={styles.container}>
      <SearchForm onFormSubmit={handleSubmitForm} />
      {children}
    </div>
  )

  function handleSubmitForm(query: string) {
    onFormSubmit(query)
  }
}

export default Container
