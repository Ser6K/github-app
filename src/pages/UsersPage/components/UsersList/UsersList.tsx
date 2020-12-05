import React from 'react'
import { gql } from '@apollo/client';
import { UsersListTypes, userIdType } from './types'

export const USER_FRAGMENT = gql`
  fragment User_Fragment on User {
    __typename
    id
    name
    avatarUrl
  }
`

const UsersList:React.FC<UsersListTypes> = ({ users, onClickUser }) => {
  return (
    <div>
      {users.map((edge) => (
        <div key={edge.node.id} onClick={() => handleClickItem(edge.node.id)}>
          <img src={edge.node.avatarUrl} alt="" />
          <p>{edge.node.name}</p>
        </div>
      ))}
    </div>
  )

  function handleClickItem(id: userIdType) {
    if (typeof onClickUser !== 'function') {
      return
    }

    onClickUser(id)
  }
}

export default UsersList
