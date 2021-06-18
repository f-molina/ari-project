import {useState, useEffect} from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import axios from 'axios'
import styles from '../styles/Home.module.css'
import TextViewer from 'components/TextViewer'
const JsonViewer = dynamic(() => import('components/JsonViewer'), {ssr: false})

export default function Home() {
  const [fileToProcess, setFileToProcess] = useState(null)
  const [delimiter, setDelimiter] = useState('')
  const [key, setKey] = useState('')
  const [jsonToShow, setJsonToShow] = useState(null)
  const [textToShow, setTextToShow] = useState(null)
  const [error, setError] = useState(null)

  const handleUpload = e => {
    console.log(e.target.files[0])
    setFileToProcess(e.target.files[0])
  }

  const onParseToXML = e => {
    e.preventDefault()
    let upload = new FormData()
    upload.append('file', fileToProcess)
    upload.append('delimiter', delimiter)
    upload.append('key', key)

    axios.post('/api/text-to-xml', upload)
      .then(({data}) => {
        if(!data.success) return setError(data.error)
        setJsonToShow(data.clients || null)
        setError(null)
        setTextToShow(null)
    })
  }

  const onParseToTXT = e => {
    e.preventDefault()

    let upload = new FormData()
    upload.append('file', fileToProcess)
    upload.append('delimiter', delimiter)
    upload.append('key', key)

    axios.post('/api/xml-to-text', upload)
    .then(({data}) => {
      if(!data.success) return setError(data.error)

      setTextToShow(data.text)
      setError(null)
      setJsonToShow(null)
  })
  }

  const cleanForm = () => {
    setJsonToShow(null)
    setTextToShow(null)
    setFileToProcess(null)
    setError(null)
    setKey('')
    setDelimiter('')
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Proyecto ARI</title>
        <meta
          name="description"
          content="Proyecto de Administración de Riesgos Informáticos, Ciclo 01-2021, UCA"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        <h1 className={styles.title}>Proyecto ARI</h1>

        <div className="row mt-2">
          <div className="col-12">
            {error && (
              <div class="alert alert-danger alert-dismissible fade show" role="alert">
                {error}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setError(null)}></button>
              </div>
            )}
          </div>
          
          <div className="col-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Entradas</h5>
                <form onSubmit={onParseToXML} autoComplete="off">
                  <label htmlFor="key" className="form-label mb-0 fw-bold">Archivo de entrada (.txt, .xml)</label>
                  <input className="form-control" type="file" onChange={handleUpload} />

                  <div className="row my-1">
                    <div className="col">
                      <label htmlFor="delimiter" className="form-label mb-0 fw-bold">Delimitador</label>
                      <input
                        id="delimiter"
                        type="text"
                        value={delimiter}
                        onChange={e => setDelimiter(e.target.value)}
                        className="form-control"
                        placeholder="Delimitador"
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="key" className="form-label mb-0 fw-bold">Clave de cifrado</label>
                      <input
                        id="key"
                        type="text"
                        value={key}
                        onChange={e => setKey(e.target.value)}
                        className="form-control"
                        placeholder="Clave de cifrado"
                        aria-label="Clave de cifrado"
                      />
                    </div>
                  </div>

                  <div className="d-flex justify-content-evenly mt-2">
                    <button className="btn btn-primary" onClick={onParseToXML}>Generar XML y JSON</button>
                    <button className="btn btn-primary" onClick={onParseToTXT}>Generar TXT</button>
                    <button className="btn btn-secondary" onClick={cleanForm}>Limpiar</button>
                  </div>
                  
                </form>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Salida</h5>
                {jsonToShow && <JsonViewer jsonToShow={jsonToShow} />}
                {textToShow && <TextViewer body={textToShow} />}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
