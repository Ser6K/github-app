import React from 'react'
import { PaginationTypes } from './types'

import styles from './Pagination.module.scss'

const Pagination: React.FC<PaginationTypes> = ({ amountOfPages, currentPage, onPageChange }) => {
  return (
    <div className={styles.pagination}>
      Pagination
    </div>
  )
}

export default Pagination