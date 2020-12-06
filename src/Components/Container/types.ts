export interface ContainerTypes {
  children: JSX.Element | (null | JSX.Element)[]
  onFormSubmit: (query: string) => void
}