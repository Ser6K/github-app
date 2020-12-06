import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import UsersPage from './UsersPage'
import RepositoryPage from './RepositoryPage'

const PageNotFoundRoute = () => <Redirect to="/" />

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <UsersPage />
      </Route>
      <Route exact path="/repository/:id">
        <RepositoryPage />
      </Route>
      <Route>
        <PageNotFoundRoute />
      </Route>
    </Switch>
  </Router>
)

export default Routes