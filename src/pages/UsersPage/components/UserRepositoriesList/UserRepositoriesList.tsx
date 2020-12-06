import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'

import Button from 'src/components/Button'
import { RESULT_ITEMS_COUNT } from 'src/constants'
import RepositoryItem, { REPOSITORY_FRAGMENT } from 'src/components/RepositoryItem'
import ResultContainer from 'src/components/ResultContainer'

import { RepositoryTypes } from 'src/components/RepositoryItem/types'
import { UserRepositoriesListTypes } from './types'

import styles from './UserRepositoriesList.module.scss'

const REPOSITORIES_QUERY = gql`
  query RepositoriesList_Query($id: ID!, $first: Int, $after: String) {
    node(id: $id) {
      ... on User {
        repositories(first: $first, after: $after, privacy: PUBLIC) {
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

const UserRepositoriesList:React.FC<UserRepositoriesListTypes> = ({ userId }) => {
  const [isFetchMoreLoading, setFetchMoreLoading] = useState(false)
  const { data, error, loading, fetchMore } = useQuery(REPOSITORIES_QUERY, { variables: { id: userId, first: RESULT_ITEMS_COUNT } })

  const repositories = data?.node?.repositories?.edges ?? []
  const hasNextPage = data?.node?.repositories?.pageInfo?.hasNextPage ?? false
  const resultContainerMessage = error != null ? 'Something went wrong! Please try again later!' : 'No repositories found!'

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Repositories</h2>
      <ResultContainer
        isLoading={loading}
        showMessage={error != null || repositories.length === 0}
        messageText={resultContainerMessage}
      >
        <div className={styles.list}>
          {repositories.map((repository: { node: RepositoryTypes }) => (
            <RepositoryItem key={repository.node.id} repository={repository.node} classNames={{ base: styles['list-item']}} />
          ))}
        </div>
      </ResultContainer>
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

export default UserRepositoriesList