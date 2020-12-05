import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import UsersRoute from './UsersRoute'
import RepositoryRoute from './RepositoryRoute'

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <UsersRoute />
      </Route>
      <Route exact path="/repository/:Id">
        <RepositoryRoute />
      </Route>
    </Switch>
  </Router>
)

export default Routes