import { FormHTMLAttributes } from 'react'

export interface SearchFormTypes extends FormHTMLAttributes<HTMLFormElement> {
  onFormSubmit: (inputValue: string) => void
}