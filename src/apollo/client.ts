import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from '@apollo/client'

const { API_AUTH_TOKEN } = process.env

const client = new ApolloClient({
  link: ApolloLink.from([
    new ApolloLink((operation, forward) => {
      operation.setContext({
        headers: {
          authorization: `Bearer ${API_AUTH_TOKEN}`,
        }
      })
      return forward(operation)
    }),
    new HttpLink({ uri: "https://api.github.com/graphql" })
  ]),
  cache: new InMemoryCache()
})

export default client