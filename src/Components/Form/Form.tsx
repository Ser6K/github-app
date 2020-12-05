import React, { SyntheticEvent } from 'react'
import { FormTypes } from './types'

import Button from 'src/Components/Button'
import Input from 'src/Components/Input'

import styles from './Form.module.scss'

const Form:React.FC<FormTypes> = ({ onFormSubmit }) => {
  return (
    <form
      onSubmit={handleSubmitForm}
      className={styles.form}
    >
      <Input onValueChange={console.log} />
      <Button type="submit">
        submit
      </Button>
    </form>
  )

  function handleSubmitForm(event: SyntheticEvent) {
    event.preventDefault()

    onFormSubmit()
  }
}

export default Form