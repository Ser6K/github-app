import React, { useState } from 'react'
import { gql, useLazyQuery } from '@apollo/client'

import Container from 'src/components/Container'
import UserRepositoriesList from './components/UserRepositoriesList'
import UsersList, { USER_FRAGMENT } from './components/UsersList'

import { userIdType } from './components/UsersList/types'

const USERS_QUERY = gql`
  query UsersPage_Query($query: String!) {
    search(query: $query, type: USER, first: 5) {
      edges {
        node {
          ... on User {
            ...User_Fragment
          }
        }
      }
    }
  }
  ${USER_FRAGMENT}
`

const UsersPage:React.FC = () => {
  const [getSearchItems, { loading: isSearchLoading, data: searchData }] = useLazyQuery(USERS_QUERY)
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)

  const searchResult = searchData?.search?.edges ?? []

  return (
    <Container
      isLoading={isSearchLoading}
      isEmpty={!isSearchLoading && searchResult.length === 0}
      onFormSubmit={handleSubmitForm}
    >
      <UsersList users={searchResult} onClickUser={handleClickUser} />
      {selectedItemId != null ? <UserRepositoriesList userId={selectedItemId} /> : null}
    </Container>
  )

  function handleSubmitForm(query: string) {
    if (selectedItemId != null) {
      setSelectedItemId(null)
    }
    getSearchItems({ variables: { query: `type:user in:name ${query}` } })
  }

  function handleClickUser(id: userIdType) {
    setSelectedItemId(prevState => prevState !== id ? id : null)
  }
}

export default UsersPage