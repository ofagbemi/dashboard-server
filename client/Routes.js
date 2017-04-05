import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './auth/components/Login'


const Routes = () => (
  <Router>
    <Switch>
      <Route path={/\/(login|register)$/} component={Login} />
    </Switch>
  </Router>
)

export default Routes
