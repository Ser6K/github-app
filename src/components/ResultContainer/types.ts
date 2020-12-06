export interface ResultContainerTypes {
  isLoading?: boolean
  showLoadingIndicator?: boolean
  showMessage?: boolean
  messageText?: string
  children: JSX.Element | (null | JSX.Element)[]
}