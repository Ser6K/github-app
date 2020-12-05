import { InMemoryCache, Reference } from '@apollo/client'

const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    User: {
      fields: {
        repositories: {
          keyArgs: false,
          merge(existing, incoming) {
            let repositories: Reference[] = []

            if (existing?.edges != null) {
              repositories = repositories.concat(existing.edges)
            }

            if (incoming?.edges != null) {
              repositories = repositories.concat(incoming.edges)
            }

            return {
              ...incoming,
              edges: repositories
            }
          }
        }
      }
    }
  }
})

export default cache