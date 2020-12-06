export interface RepositoryTypes {
  id: string
  name: string
  watchers: {
    totalCount: number
  }
  stargazerCount: number
}

export interface RepositoryItemTypes {
  repository: RepositoryTypes
  classNames?: {
    base?: string
    name?: string
    stats?: string
  }
}