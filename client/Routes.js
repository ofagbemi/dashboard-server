import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './Login'


const Routes = () => (
  <Router>
    <Route path="/login" component={Login} />
  </Router>
)

export default Routes
