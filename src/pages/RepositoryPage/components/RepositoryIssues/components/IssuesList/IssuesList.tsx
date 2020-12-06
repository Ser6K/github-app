import React from 'react'
import { gql } from '@apollo/client'

import { getDaysAgoText } from 'src/utils'

import { IssueTypes, IssuesListTypes } from './types'

import styles from './IssuesList.module.scss'

export const ISSUE_FRAGMENT = gql`
  fragment Issue_Fragment on Issue {
    id
    createdAt
    title
    author {
      login
    }
  }
`

const IssuesList: React.FC<IssuesListTypes> = ({ issues }) => (
  <div className={styles.list}>
    {issues.map(({ node }: { node: IssueTypes }) => (
      <div key={node.id} className={styles['list-item']}>
        <p className={styles['list-item-title']}>
          {node.title}
        </p>
        <p className={styles['list-item-info']}>
          Created {getDaysAgoText(node.createdAt)} by <span className={styles['list-item-info-author']}>{node.author.login}</span>
        </p>
      </div>
    ))}
  </div>
)

export default IssuesList
