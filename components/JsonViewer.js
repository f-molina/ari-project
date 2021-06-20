import ReactJson from 'react-json-view'

const JsonViewer = ({jsonToShow}) => {
  return (
    <div className="card p-3">
      <ReactJson src={jsonToShow} name={false} />
    </div>
  )
}

export default JsonViewer
