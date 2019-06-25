export default (props) => {
  const { rightColumn, leftColumn } = props

  return (
      <div className="c-col-2 container">
        <div className="c-col-left">
          {rightColumn[0]['@id']}
        </div>
        <div className="c-col-right">
          {leftColumn[0]['@id']}
        </div>  
      </div>
    )
}