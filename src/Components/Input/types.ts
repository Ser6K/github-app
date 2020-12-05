export interface InputTypes extends React.InputHTMLAttributes<HTMLInputElement> {
  onValueChange: (value: string) => void
}