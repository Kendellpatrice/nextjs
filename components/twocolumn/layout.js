import Text from './widgets/text.js'
import Image from './widgets/image.js'

let getComponentProps = (componentId, componentList, siteLanguage) => {
  return getWidget(componentList.find((item) => item['@id'] === componentId), siteLanguage, componentList)
}

let getWidget = (component, siteLanguage, componentList) => {
  switch (component['@type']) {
    case 'https://raw.githubusercontent.com/janxl/nextjs/master/schemas/image.json':
      return <Image imageId={component.image['@id']} componentList={componentList} siteLanguage={siteLanguage} />
  
    case 'https://raw.githubusercontent.com/janxl/nextjs/master/schemas/richtextfield.json':
      return <Text header={component.title.values.find((item) => item['locale'] === siteLanguage).value} 
        text={component.body.values.find((item) => item['locale'] === siteLanguage).value} />
  }
}

export default (props) => {
  const { componentList, rightColumn, leftColumn, siteLanguage } = props

  return (
    <div className="c-two-col">
      <div className="container row c-col-wrapper">
        <div className="col-md-6 c-two-col__container">
          {getComponentProps(rightColumn[0]['@id'], componentList, siteLanguage)}
        </div>
        <div className="col-md-6 c-two-col__container-image">
          {getComponentProps(leftColumn[0]['@id'], componentList, siteLanguage)}
        </div>  
      </div>
    </div>
  )
}