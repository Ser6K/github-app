export type userIdType = string

export interface UserTypes {
  id: userIdType
  name: string | null
  avatarUrl: string
}

export interface UsersListTypes {
  users: { node: UserTypes }[]
  onClickUser: (id: userIdType) => void
  selectedUserId: userIdType | null
}
