import React, { useState, SyntheticEvent } from 'react'
import { gql, useMutation } from '@apollo/client'

import Modal from 'src/components/Modal'
import Input from 'src/components/Input'
import Button from 'src/components/Button'

import { AddIssueModalTypes } from './types'

import styles from './AddIssueModal.module.scss'

const AddIssueModal: React.FC<AddIssueModalTypes> = ({ onClose }) => {
  const [formValues, setFormValues] = useState({ title: '', comment: '' })

  return (
    <Modal onClose={onClose}>
      <div className={styles['modal-top']}>
        <p className={styles['modal-top-title']}>New issue</p>
      </div>
      <form onSubmit={handleSubmitForm} className={styles['modal-form']}>
        <Input
          placeholder="Title"
          onValueChange={(newValue) => { handleChangeInputValue('title', newValue) }}
          type="text"
          className={styles['form-input']}
        />
        <Input
          placeholder="Leave a comment"
          onValueChange={(newValue) => { handleChangeInputValue('comment', newValue) }}
          type="textarea"
          className={styles['form-textarea']}
        />
        <div className={styles['form-actions']}>
          <Button color="transparent" onClick={onClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </div>
      </form>
    </Modal>
  )

  function handleSubmitForm(event: SyntheticEvent) {
    event.preventDefault()

    console.log(formValues)
  }

  function handleChangeInputValue(name: string, value: string) {
    setFormValues(prevState => ({ ...prevState, [name]: value }))
  }
}

export default AddIssueModal
