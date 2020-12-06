import React from 'react'
import { gql } from '@apollo/client'

import cx from 'classnames'

import { UsersListTypes, userIdType } from './types'

import styles from './UsersList.module.scss'

export const USER_FRAGMENT = gql`
  fragment User_Fragment on User {
    __typename
    id
    name
    login
    avatarUrl
  }
`

const UsersList:React.FC<UsersListTypes> = ({ users, onClickUser, selectedUserId }) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        Users
      </h2>
      <div className={styles.list}>
        {users.map((edge) => (
          <div
            key={edge.node.id}
            className={cx(styles['list-item'], { [styles.selected]: edge.node.id === selectedUserId })}
            onClick={() => handleClickItem(edge.node.id)}
          >
            <img
              className={styles['list-item-avatar']}
              src={edge.node.avatarUrl}
              alt={`${edge.node.name} avatar image`}
            />
            <p className={styles['list-item-name']}>
              {edge.node.name != null && edge.node.name.length > 0 ? edge.node.name : edge.node.login ?? '-'}
            </p>
          </div>
        ))}
      </div>
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
