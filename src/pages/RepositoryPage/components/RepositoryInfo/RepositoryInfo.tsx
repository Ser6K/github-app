import React from 'react'
import { gql, useQuery } from '@apollo/client'

import RepositoryItem, { REPOSITORY_FRAGMENT } from 'src/components/RepositoryItem'
import ResultContainer from 'src/components/ResultContainer'

import { RepositoryInfoTypes } from './types'

import styles from './RepositoryInfo.module.scss'

const REPOSITORY_INFO_QUERY = gql`
  query RepositoryIssues_Query($id: ID!) {
    node(id: $id) {
      ... on Repository {
        ...Repository_Fragment
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
`

const RepositoryInfo: React.FC<RepositoryInfoTypes> = ({ repositoryId }) => {
  const { loading, error, data } = useQuery(REPOSITORY_INFO_QUERY, { variables: { id: repositoryId } })

  return (
    <ResultContainer
      isLoading={loading} 
      showLoadingIndicator={false}
      showMessage={error != null || data?.node == null}
      messageText={error != null ? 'Something went wrong! Please try again later!' : 'Repository is private or doesn\'t exist'}
    >
      <RepositoryItem
        repository={data?.node}
        classNames={{ base: styles['repository-base'], name: styles['repository-base-name'] }}
      />
    </ResultContainer>
  )
}

export default RepositoryInfo
