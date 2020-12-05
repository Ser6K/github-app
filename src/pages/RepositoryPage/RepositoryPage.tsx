import React from 'react'
import Container from 'src/components/Container'

const RepositoryPage:React.FC = () => {
  return (
    <Container isLoading={false} isEmpty={false} onFormSubmit={() => {}}>
      <div>Repository Route</div>
    </Container>
  )
}

export default RepositoryPage