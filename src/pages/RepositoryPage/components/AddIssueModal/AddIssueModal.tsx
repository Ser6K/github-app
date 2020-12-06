import React, { useState, SyntheticEvent } from 'react'
import { useParams } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client'

import Modal from 'src/components/Modal'
import Input from 'src/components/Input'
import Button from 'src/components/Button'
import { ISSUE_FRAGMENT } from '../IssuesList/IssuesList'

import { AddIssueModalTypes } from './types'

import styles from './AddIssueModal.module.scss'

const ADD_ISSUE_MUTATION = gql`
  mutation AddIssue_MUTATION($input: CreateIssueInput!) {
    createIssue(input: $input) {
      issue {
        ...Issue_Fragment
      }
    }
  }
  ${ISSUE_FRAGMENT}
`

const AddIssueModal: React.FC<AddIssueModalTypes> = ({ onClose }) => {
  const { id }: { id: string } = useParams()
  const [formValues, setFormValues] = useState({ title: '', comment: '' })

  const [executeAddIssueMutation, { loading, error }] = useMutation(ADD_ISSUE_MUTATION, {
    onCompleted: () => {
      onClose()
    },
    update: cache => {
      cache.evict({ id: "ROOT_QUERY" })
    }
  })

  const errorMessage = error?.graphQLErrors?.[0]?.message ?? ''

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
        {errorMessage.length > 0 ? (
          <p className={styles['form-error']}>{errorMessage}</p>
        ) : null }
        <div className={styles['form-actions']}>
          <Button color="transparent" onClick={onClose}>Cancel</Button>
          <Button disabled={loading} type="submit">Create</Button>
        </div>
      </form>
    </Modal>
  )

  function handleSubmitForm(event: SyntheticEvent) {
    event.preventDefault()

    if (loading) {
      return
    }

    const input = {
      repositoryId: id,
      body: formValues.comment,
      title: formValues.title
    }

    executeAddIssueMutation({ variables: { input }})
  }

  function handleChangeInputValue(name: string, value: string) {
    setFormValues(prevState => ({ ...prevState, [name]: value }))
  }
}

export default AddIssueModal
