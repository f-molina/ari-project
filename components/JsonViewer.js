import ReactJson from 'react-json-view'

const JsonViewer = ({jsonToShow}) => {
  return (
    <div>
      <ReactJson src={jsonToShow} theme="monokai" />
    </div>
  )
}

export default JsonViewer
