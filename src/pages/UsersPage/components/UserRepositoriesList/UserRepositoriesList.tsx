import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'

import { Link } from 'react-router-dom'

import Button from 'src/components/Button'

import { RESULT_ITEMS_COUNT } from 'src/constants'
import { UserRepositoriesListTypes, RepositoryTypes } from './types'

import styles from './UserRepositoriesList.module.scss'

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

const REPOSITORIES_QUERY = gql`
  query RepositoriesList_Query($id: ID!, $first: Int, $after: String) {
    node(id: $id) {
      ... on User {
        repositories(first: $first, after: $after, privacy: PUBLIC) {
          totalCount
          pageInfo {
            endCursor
            hasNextPage
          }
          edges {
            node {
              ... on Repository {
                ...Repository_Fragment
              }
            }
          }
        }
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
`

const RepositoriesList:React.FC<UserRepositoriesListTypes> = ({ userId }) => {
  const [isFetchMoreLoading, setFetchMoreLoading] = useState(false)
  const { data, loading, fetchMore } = useQuery(REPOSITORIES_QUERY, { variables: { id: userId, first: RESULT_ITEMS_COUNT } })

  const repositories = data?.node?.repositories?.edges ?? []
  const hasNextPage = data?.node?.repositories?.pageInfo?.hasNextPage ?? false

  let contentElement = null

  if (loading) {
    contentElement = <div className={styles.centered}>Loading</div>
  } else if (repositories.length === 0) {
    contentElement = <div className={styles.centered}>No Repositories</div>
  } else {
    contentElement = (
      <div className={styles.list}>
        {contentElement = repositories.map((repository: { node: RepositoryTypes }) => {
          const { id, name, stargazerCount, watchers } = repository.node

          return (
            <Link
              to={`/repository/${id}`}
              key={id}
              className={styles['list-item']}
            >
              <p className={styles['list-item-name']}>
                {name}
              </p>
              <p className={styles['list-item-stats']}>
                {stargazerCount} {stargazerCount === 1 ? 'star' : 'stars'} / {watchers.totalCount} {watchers.totalCount === 1 ? 'watcher' : 'watchers'}
              </p>
            </Link>
          )
        })}
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Repositories</h2>
      {contentElement}
      {hasNextPage ? (
        <Button
          onClick={handleClickLoadMore}
          className={styles.button}
        >
           {isFetchMoreLoading ? 'Loading' : 'Load more'}
        </Button>
      ) : null}
    </div>
  )

  async function handleClickLoadMore() {
    setFetchMoreLoading(true)

    await fetchMore({
      variables: {
        after: data?.node?.repositories?.pageInfo?.endCursor
      }
    })

    setFetchMoreLoading(false)
  }
}

export default RepositoriesList