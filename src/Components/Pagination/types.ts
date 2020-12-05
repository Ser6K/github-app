export type page = number

export interface PaginationTypes {
  amountOfPages: number
  currentPage: page
  onPageChange: (page: page) => void
}