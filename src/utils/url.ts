export function getUrlSearchParamValue(paramName: string) {
  const { searchParams } = new URL(window.location.toString())

  return searchParams.get(paramName) ?? ''
}