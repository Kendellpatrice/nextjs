export default (props) => {
  const { image } = props
  const imageUrl = `https://${image.defaultHost}/i/${image.endpoint}/${image.name}`
  console.log('image props', props)

  return (
    <div className="c-image__wrapper">
      <img className="c-image" src={imageUrl} />
    </div>
  )
}