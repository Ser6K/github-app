import React from 'react'
import { gql } from '@apollo/client'
import { Link } from 'react-router-dom'
import cx from 'classnames'

import { RepositoryItemTypes } from './types'

import styles from './RepositoryItem.module.scss'

export const REPOSITORY_FRAGMENT = gql`
  fragment Repository_Fragment on Repository {
    id
    name
    watchers {
      totalCount
    }
    stargazerCount
  }
`

const RepositoryItem: React.FC<RepositoryItemTypes> = ({ repository, classNames = {} }) => {
  const { id, name, stargazerCount, watchers } = repository

  return (
    <Link
      to={`/repository/${id}`}
      key={id}
      className={cx(styles.item, classNames.base)}
    >
      <p className={cx(styles['item-name'], classNames.name)}>
        {name}
      </p>
      <p className={cx(styles['item-stats'], classNames.stats)}>
        {stargazerCount} {stargazerCount === 1 ? 'star' : 'stars'} / {watchers.totalCount} {watchers.totalCount === 1 ? 'watcher' : 'watchers'}
      </p>
    </Link>
  )
}

export default RepositoryItem