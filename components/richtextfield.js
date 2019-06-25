import ReactMarkdown from 'react-markdown'

export default (props) => {
  const { body } = props

  return (
    <div className="c-richtext container">
      <ReactMarkdown source={body.values.find((item) => item['locale'] === props.siteLanguage).value} />
    </div>
  )
}