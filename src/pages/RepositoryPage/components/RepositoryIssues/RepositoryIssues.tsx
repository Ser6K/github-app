import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'

import Button from 'src/components/Button'
import ResultContainer from 'src/components/ResultContainer'
import IssuesTop from '../IssuesTop'
import IssuesList, { ISSUE_FRAGMENT } from '../IssuesList'

import { RESULT_ITEMS_COUNT } from 'src/constants'
import { RepositoryIssuesTypes } from './types'

import styles from './RepositoryIssues.module.scss'

const REPOSITORY_ISSUES_QUERY = gql`
  query RepositoryIssues_Query($id: ID!, $first: Int, $after: String) {
    node(id: $id) {
      ... on Repository {
        issues(first: $first, after: $after, states: [OPEN]) {
          pageInfo {
            endCursor
            hasNextPage
          }
          edges {
            node {
              ... on Issue {
                ...Issue_Fragment
              }
            }
          }
        }
      }
    }
  }
  ${ISSUE_FRAGMENT}
`

const RepositoryIssues: React.FC<RepositoryIssuesTypes> = ({ repositoryId }) => {
  const [isFetchMoreLoading, setFetchMoreLoading] = useState(false)
  const { loading, error, data, fetchMore } = useQuery(REPOSITORY_ISSUES_QUERY, { variables: { first: RESULT_ITEMS_COUNT, id: repositoryId } })

  const issues = data?.node?.issues?.edges ?? []
  const hasNextPage = data?.node?.issues?.pageInfo?.hasNextPage ?? false
  const resultContainerMessage = error != null ? 'Something went wrong! Please try again later!' : 'No issues found'

  return (
    <div className={styles.wrapper}>
      <IssuesTop />
      <ResultContainer
        isLoading={loading}
        showMessage={issues.length === 0 || error != null}
        messageText={resultContainerMessage}
      >
        <IssuesList issues={issues} />
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
        after: data?.node?.issues?.pageInfo?.endCursor
      }
    })

    setFetchMoreLoading(false)
  }
}

export default RepositoryIssues