import React from 'react'
import Container from 'src/components/Container'
import { gql, useQuery } from '@apollo/client';

const USERS_QUERY = gql`
  query users($query: String!, $first: Int) {
    search(query: $query, type: USER, first: $first) {
      edges {
        node {
          ... on User {
            name
          }
        }
      }
    }
  }
`

const UsersRoute:React.FC = () => {
  const { loading, error, data } = useQuery(USERS_QUERY, { variables: { query: 'ser', first: 10 }});

  return (
    <Container
      isLoading={loading}
      isEmpty={!loading && data == null}
    >
      <div>Users Route</div>
    </Container>
  )
}

export default UsersRoute