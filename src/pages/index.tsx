import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import UsersPage from './UsersPage'
import RepositoryPage from './RepositoryPage'

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <UsersPage />
      </Route>
      <Route exact path="/repository/:Id">
        <RepositoryPage />
      </Route>
    </Switch>
  </Router>
)

export default Routes