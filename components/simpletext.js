export default (props) => {
  const { paragraph, intro } = props

  return (
    <div className="container c-simple-text">
      { <p className="c-simple-text__paragraph">{intro.values.find((itemText) => itemText['locale'] === props.siteLanguage).value}</p> }
      { paragraph.map((item, index) => <p className="c-simple-text__paragraph" key={`key-${index}`}>{item.values.find((itemText) => itemText['locale'] === props.siteLanguage).value}</p>) }
    </div>
  )
}