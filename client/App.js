export default class App extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
