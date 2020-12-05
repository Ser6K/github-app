import React from 'react'
import { gql, useQuery } from '@apollo/client'

import { Link } from 'react-router-dom'

import Button from 'src/components/Button'

import { RESULT_ITEMS_COUNT } from 'src/constants'
import { UserRepositoriesListTypes, RepositoryTypes } from './types'

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
  const queryVariables = { id: userId, first: RESULT_ITEMS_COUNT }
  const { data, loading, fetchMore } = useQuery(REPOSITORIES_QUERY, { variables: queryVariables })

  if (loading) {
    return <div>Loading</div>
  }

  const repositories = data?.node?.repositories?.edges ?? []
  const hasNextPage = data?.node?.repositories?.pageInfo?.hasNextPage ?? false

  let contentElement = null

  if (loading) {
    contentElement = <div>Loading</div>
  } else if (repositories.length === 0) {
    contentElement = <div>No Repositories</div> 
  } else {
    contentElement = repositories.map((repository: { node: RepositoryTypes }) => (
      <Link
        to={`/repository/${repository.node.id}`}
        key={repository.node.id}
      >
        <p>
          {repository.node.name}
        </p>
        <p>
          {repository.node.stargazerCount} stars / {repository.node.watchers.totalCount} watchers
        </p>
      </Link>
    ))
  }

  return (
    <div>
      {contentElement}
      {hasNextPage ? (
        <Button onClick={handleClickLoadMore}>Load More</Button>
      ) : null}
    </div>
  )

  function handleClickLoadMore() {
    fetchMore({
      variables: {
        after: data?.node?.repositories?.pageInfo?.endCursor
      },
    })
  }
}

export default RepositoriesList