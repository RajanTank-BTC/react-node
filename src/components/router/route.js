import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Login from '../login/Login'
import Info from '../Info/info'
import EditProfile from '../Edit/edit'


const Routers = (routerProps) => {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => <Login {...props} {...routerProps} />}
        />
        <Route
          exact
          path="/info"
          render={(props) => <Info {...props} {...routerProps} />} />
        <Route
          exact
          path="/edit-profile"
          render={(props) => <EditProfile {...props} {...routerProps} />}
        />
      </Switch>
    </Router>
  )
}

export default Routers