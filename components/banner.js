export default (props) => {
  const { headline, strapline, image } = props
  const imageUrl = `https://${image.defaultHost}/i/${image.endpoint}/${image.name}`

  return (
    <div className="c-banner" style={{'backgroundImage': `url(${imageUrl})`}}>
      <h1 className="c-banner__heading">{headline.values.find((item) => item['locale'] === props.siteLanguage).value}</h1>
      <h2 className="c-banner__sub-heading">{strapline != null ? strapline.values[0].value : ''}</h2>
    </div>
  )
}