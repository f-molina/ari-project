import ReactJson from 'react-json-view'

const JsonViewer = ({jsonToShow}) => {
  return (
    <div className="card p-3">
      <ReactJson src={jsonToShow} />
    </div>
  )
}

export default JsonViewer
