export interface IssueTypes {
  id: string
  createdAt: string
  title: string
  author: {
    login: string
  }
}

export interface IssuesListTypes {
  issues: { node: IssueTypes }[]
}