import React from 'react'
import { useParams } from 'react-router-dom'

import { RouteParamsTypes } from 'src/types'

import Container from 'src/components/Container'
import RepositoryInfo from './components/RepositoryInfo'
import RepositoryIssues from './components/RepositoryIssues'

const RepositoryPage:React.FC = () => {
  const { id }: RouteParamsTypes = useParams()

  return (
    <Container>
      <RepositoryInfo repositoryId={id} />
      <RepositoryIssues repositoryId={id} />
    </Container>
  )
}

export default RepositoryPage