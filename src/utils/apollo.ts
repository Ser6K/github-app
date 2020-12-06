import { Reference } from '@apollo/client'

interface ResultTypes {
  edges: Reference[]
}

export function mergeFieldResult(existing: ResultTypes, incoming: ResultTypes) {
  let edges: Reference[] = []

  if (existing?.edges != null) {
    edges = edges.concat(existing.edges)
  }

  if (incoming?.edges != null) {
    edges = edges.concat(incoming.edges)
  }

  return {
    ...incoming,
    edges
  }
}
