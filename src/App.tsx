import React from 'react'
import { ApolloProvider } from '@apollo/client';
import apolloClient from 'src/apollo/client'
import Pages from 'src/pages'

import 'src/css/global.scss'

const App:React.FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <Pages />
    </ApolloProvider>
  )
}

export default App