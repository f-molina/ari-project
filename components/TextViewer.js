import React from 'react'

const TextViewer = ({body}) => {
  return (
    <div className='card p-3'>
      <pre className='m-0'><code>{body}</code></pre>
    </div>
  )
}

export default TextViewer
