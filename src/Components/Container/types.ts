export interface ContainerTypes {
  children: JSX.Element | (null | JSX.Element)[]
  isLoading: boolean
  isEmpty: boolean
  onFormSubmit: (query: string) => void
}