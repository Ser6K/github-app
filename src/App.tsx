import React from 'react'
import { ApolloProvider } from '@apollo/client';
import apolloClient from 'src/apollo/client'
import Routes from 'src/routes'

const App:React.FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <Routes />
    </ApolloProvider>
  )
}

export default App