import React, { useState } from 'react'
import { ContainerTypes } from './types'

import SearchForm from 'src/components/SearchForm'

import styles from './Container.module.scss'

const Container:React.FC<ContainerTypes> = ({ isEmpty, isLoading, children, onFormSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('')
  let contentElement = null

  if (isLoading) {
    contentElement = <div className={styles.centered}>Loading</div>
  } else if (isEmpty && searchQuery.length > 0) {
    contentElement = <div className={styles.centered}>No results</div>
  } else if (searchQuery.length === 0) {
    contentElement = <div className={styles.centered}>Please, enter user name!</div>
  } else {
    contentElement = children
  }

  return (
    <div className={styles.container}>
      <SearchForm onFormSubmit={handleSubmitForm} />
      {contentElement}
    </div>
  )

  function handleSubmitForm(query: string) {
    setSearchQuery(query)
    onFormSubmit(query)
  }
}

export default Container
