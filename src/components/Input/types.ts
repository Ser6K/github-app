export interface InputTypes extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  onValueChange: (value: string) => void
  [props: string]: any
}