export interface RepositoryTypes {
  id: string
  name: string
  watchers: {
    totalCount: number
  }
  stargazerCount: number
}

export interface UserRepositoriesListTypes {
  userId: string
}