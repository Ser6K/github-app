import React, { useState, memo } from 'react'

import Button from 'src/components/Button'
import AddIssueModal from '../AddIssueModal'

import styles from './IssuesTop.module.scss'

const IssuesTop: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState(false)

  return (
    <>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Issues:</h2>  
        <Button onClick={toggleModal}>
          Add new issue
        </Button>
      </div>
      {isModalVisible ? <AddIssueModal onClose={toggleModal} /> : null}
    </>
  )

  function toggleModal() {
    setModalVisible(prevState => !prevState)
  }
}

export default memo(IssuesTop)
