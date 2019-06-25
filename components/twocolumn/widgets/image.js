export default (props) => {
  const { imageId, componentList, siteLanguage } = props

  let component = componentList.find((item) => item['@id'] === imageId)
  let { defaultHost, endpoint, name } = component
  const imageUrl = `https://${defaultHost}/i/${endpoint}/${name}`
  
  return (
    <div style={{backgroundImage: `url(${imageUrl})`}}>
      
    </div>
  )
}