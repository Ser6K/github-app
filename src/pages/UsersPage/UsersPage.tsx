import React, { useState } from 'react'
import { gql, useLazyQuery } from '@apollo/client'

import Container from 'src/components/Container'
import ResultContainer from 'src/components/ResultContainer'
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

/* TODO: Revise styling if time permits */

const UsersPage:React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [getSearchItems, { loading, error, data }] = useLazyQuery(USERS_QUERY)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

  const searchResult = data?.search?.edges ?? []

  return (
    <Container onFormSubmit={handleSubmitForm}>
      <ResultContainer
        isLoading={loading}
        showMessage={error != null || searchResult.length === 0}
        messageText={getResultContainerMessage()}
      >
        <UsersList users={searchResult} onClickUser={handleClickUser} selectedUserId={selectedUserId} />
      </ResultContainer>
      {selectedUserId != null ? <UserRepositoriesList userId={selectedUserId} /> : null}
    </Container>
  )

  function handleSubmitForm(query: string) {
    if (selectedUserId != null) {
      setSelectedUserId(null)
    }

    if (query.length === 0) {
      return
    }

    setSearchQuery(query)
    getSearchItems({ variables: { query: `type:user in:name:login ${query}` } })
  }

  function handleClickUser(id: userIdType) {
    setSelectedUserId(prevState => prevState !== id ? id : null)
  }

  function getResultContainerMessage() {
    if (searchQuery.length === 0) {
      return 'Please, enter user name!'
    }
    return error != null ? 'Something went wrong! Please try again later' : 'No user found!'
  }
}

export default UsersPage