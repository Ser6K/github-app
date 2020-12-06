import { InMemoryCache } from '@apollo/client'
import { mergeFieldResult } from 'src/utils'

const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    User: {
      fields: {
        repositories: {
          keyArgs: false,
          merge(existing, incoming) {
            return mergeFieldResult(existing, incoming)
          }
        }
      }
    },
    Repository: {
      fields: {
        issues: {
          keyArgs: false,
          merge(existing, incoming) {
            return mergeFieldResult(existing, incoming)
          }
        }
      }
    }
  }
})

export default cache