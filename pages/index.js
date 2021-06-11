import {useState, useEffect} from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import axios from 'axios'
import styles from '../styles/Home.module.css'
const JsonViewer = dynamic(() => import('components/JsonViewer'), {ssr: false})

export default function Home() {
  const [fileToProcess, setFileToProcess] = useState(null)
  const [jsonToShow, setJsonToShow] = useState(null)

  const handleUpload = e => {
    console.log(e.target.files[0])
    setFileToProcess(e.target.files[0])
  }

  const onSubmit = e => {
    e.preventDefault()
    let upload = new FormData()
    upload.append('file', fileToProcess)

    axios.post('/api/text-to-xml', upload).then(({data}) => {
      setJsonToShow(data.clients || null)
    })
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
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Entradas</h5>
                <form onSubmit={onSubmit} autoComplete="off">
                  <label for="key" class="form-label mb-0 fw-bold">Archivo de entrada (.txt, .xml)</label>
                  <input class="form-control" type="file" onChange={handleUpload} />

                  <div class="row my-1">
                    <div class="col">
                      <label for="delimiter" class="form-label mb-0 fw-bold">Delimitador</label>
                      <input
                        id="delimiter"
                        type="text"
                        class="form-control"
                        placeholder="Delimitador"
                      />
                    </div>
                    <div class="col">
                      <label for="key" class="form-label mb-0 fw-bold">Clave de cifrado</label>
                      <input
                        id="key"
                        type="text"
                        class="form-control"
                        placeholder="Clave de cifrado"
                        aria-label="Clave de cifrado"
                      />
                    </div>
                  </div>
                  <input type="submit" value="Convertir" class="btn btn-primary" />
                </form>
              </div>
            </div>
          </div>
          <div className="col-6">{jsonToShow && <JsonViewer jsonToShow={jsonToShow} />}</div>
        </div>
      </main>
    </div>
  )
}
