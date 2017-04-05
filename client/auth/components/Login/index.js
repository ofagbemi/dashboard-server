import classNames from 'classnames'
import { Link } from 'react-router-dom'

import styles from './index.scss'


function propsContainsLoginUrl(props) {
  return props.location.pathname.includes('login')
}

export default class Login extends React.Component {
  constructor(props, ...args) {
    super(props, ...args)

    this.state = {
      login: propsContainsLoginUrl(props),
    }
  }

  componentWillReceiveProps(nextProps) {
    const nextIsLogin = propsContainsLoginUrl(nextProps)
    if (propsContainsLoginUrl(this.props) !== nextIsLogin) {
      this.setState({ login: nextIsLogin })
    }
  }

  render() {
    return (
      <form className={classNames(styles.login, 'main-container')}>
        <h2>
          <span className={styles.streetCode}>StreetCode</span> Dashboard
        </h2>
        <label>
          <p>Email</p>
          <input type="email" />
        </label>
        <label>
          <p>Password</p>
          <input type="password" />
        </label>
        {!this.state.login && (
          <label>
            <p>Confirm password</p>
            <input type="password" />
          </label>
        )}
        <div className="button-group">
          {this.state.login ? (
            <div className="button-group">
              <button className="primary">Log in</button>
              <Link to="/register">I don’t have an account</Link>
            </div>
          ) : (
            <div className="button-group">
              <button className="primary">Register</button>
              <Link to="/login">I already have an account</Link>
            </div>
          )}
        </div>
      </form>
    )
  }
}
