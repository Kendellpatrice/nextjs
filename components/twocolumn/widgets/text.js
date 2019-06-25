export default (props) => {
  const {header, text} = props

  return <div>
    <h2 className="c-two-col__heading">{header}</h2>
    <div>{text}</div>
  </div>
}