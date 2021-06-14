import {useState, useEffect} from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import axios from 'axios'
import styles from '../styles/Home.module.css'
const JsonViewer = dynamic(() => import('components/JsonViewer'), {ssr: false})

export default function Home() {
  const [fileToProcess, setFileToProcess] = useState(null)
  const [delimiter, setDelimiter] = useState('')
  const [key, setKey] = useState('')
  const [jsonToShow, setJsonToShow] = useState(null)

  const handleUpload = e => {
    console.log(e.target.files[0])
    setFileToProcess(e.target.files[0])
  }

  const onSubmit = e => {
    e.preventDefault()
    let upload = new FormData()
    upload.append('file', fileToProcess)
    upload.append('delimiter', delimiter)
    upload.append('key', key)

    axios.post('/api/text-to-xml', upload).then(({data}) => {
      setJsonToShow(data.clients || null)
    })
  }

  const cleanForm = () => {
    setJsonToShow(null)
    setFileToProcess(null)
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

        <div className="row">
          <div className="col-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Entradas</h5>
                <form onSubmit={onSubmit} autoComplete="off">
                  <label for="key" className="form-label mb-0 fw-bold">Archivo de entrada (.txt, .xml)</label>
                  <input className="form-control" type="file" onChange={handleUpload} />

                  <div className="row my-1">
                    <div className="col">
                      <label for="delimiter" className="form-label mb-0 fw-bold">Delimitador</label>
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
                      <label for="key" className="form-label mb-0 fw-bold">Clave de cifrado</label>
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
                    <button className="btn btn-primary" onClick={onSubmit}>Generar XML y JSON</button>
                    <button className="btn btn-primary" onClick={onSubmit}>Generar TXT</button>
                    <button className="btn btn-secondary" onClick={cleanForm}>Limpiar</button>
                  </div>
                  
                </form>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card">
              <div className="card-body">
                {jsonToShow && <JsonViewer jsonToShow={jsonToShow} />}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
