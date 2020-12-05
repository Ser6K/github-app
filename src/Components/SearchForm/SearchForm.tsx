import React, { useState, SyntheticEvent } from 'react'
import { SearchFormTypes } from './types'

import Button from 'src/components/Button'
import Input from 'src/components/Input'

import styles from './SearchForm.module.scss'

const SearchForm:React.FC<SearchFormTypes> = ({ onFormSubmit }) => {
  const [inputValue, setInputValue] = useState('')

  return (
    <form
      onSubmit={handleSubmitForm}
      className={styles.form}
    >
      <Input onValueChange={handleChangeInput} />
      <Button type="submit">
        submit
      </Button>
    </form>
  )

  function handleChangeInput(value: string) {
    setInputValue(value)
  }

  function handleSubmitForm(event: SyntheticEvent) {
    event.preventDefault()

    onFormSubmit(inputValue)
  }
}

export default SearchForm