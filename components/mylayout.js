const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
}

const Layout = props => (
  <div className="u-component-wrapper">
    {props.children}
  </div>
)

export default Layout