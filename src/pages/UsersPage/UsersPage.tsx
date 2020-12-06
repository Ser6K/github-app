import React, { useEffect, useState } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import { useLocation } from 'react-router-dom'

import Container from 'src/components/Container'
import ResultContainer from 'src/components/ResultContainer'
import UserRepositoriesList from './components/UserRepositoriesList'
import UsersList, { USER_FRAGMENT } from './components/UsersList'

import { userIdType } from './components/UsersList/types'

import { getUrlSearchParamValue } from 'src/utils'

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
  const searchQuery = getUrlSearchParamValue('q')
  const location = useLocation()
  const [getSearchItems, { loading, error, data }] = useLazyQuery(USERS_QUERY)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

  const searchResult = data?.search?.edges ?? []

  useEffect(() => {
    if (searchQuery.length === 0) {
      return
    }
    setSelectedUserId(null)
    getSearchItems({ variables: { query: `type:user in:name:login ${searchQuery}` } })
  }, [location])

  return (
    <Container>
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