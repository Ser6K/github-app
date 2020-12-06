import React, { useState, SyntheticEvent } from 'react'
import { SearchFormTypes } from './types'

import { useHistory } from 'react-router-dom'

import Button from 'src/components/Button'
import Input from 'src/components/Input'

import { getUrlSearchParamValue } from 'src/utils'

import styles from './SearchForm.module.scss'

const SearchForm:React.FC<SearchFormTypes> = () => {
  const history = useHistory()

  const urlQuery = getUrlSearchParamValue('q')
  const [inputValue, setInputValue] = useState(urlQuery)

  return (
    <form
      onSubmit={handleSubmitForm}
      className={styles.form}
    >
      <Input
        value={urlQuery}
        onValueChange={handleChangeInput}
      />
      <Button
        type="submit"
        className={styles.button}
        disabled={inputValue.length === 0 || urlQuery === inputValue}
      >
        Search
      </Button>
    </form>
  )

  function handleChangeInput(value: string) {
    setInputValue(value)
  }

  function handleSubmitForm(event: SyntheticEvent) {
    event.preventDefault()

    if (urlQuery === inputValue || inputValue.length === 0) {
      return
    }

    history.replace(`/?q=${inputValue}`)
  }
}

export default SearchForm