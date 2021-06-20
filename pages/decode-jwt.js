import {useState} from 'react'
import dynamic from 'next/dynamic'
import Link from "next/link"
import Head from 'next/head'
import axios from 'axios'
const JsonViewer = dynamic(() => import('components/JsonViewer'), {ssr: false})

const DecodeJWT = () => {
  const [jwt, setJwt] = useState('')
  const [key, setKey] = useState('')
  const [jsonToShow, setJsonToShow] = useState(null)
  const [error, setError] = useState(null)

  const onDecodeJWT = () => {
    axios.post('/api/decode-jwt', { jwt, key })
      .then(({data}) => {
        if(!data.success) return setError(data.error)
        setJsonToShow(data.json)
    })
  }

  return (
    <div className='mt-4'>
      <Head>
        <title>Proyecto ARI</title>
        <meta
          name="description"
          content="Proyecto de Administración de Riesgos Informáticos, Ciclo 01-2021, UCA"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        <h1 className='text-center'>Proyecto ARI</h1>
        <div className="row justify-content-md-center">
          <div className="col-12 col-md-5">
            {error && (
              <div class="alert alert-danger alert-dismissible fade show" role="alert">
                {error}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setError(null)}></button>
              </div>
            )}
          </div>
        </div>
        <div className="row justify-content-md-center">
          <div className="col-12 col-md-5">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Entradas</h5>

                <div className="col">
                  <label htmlFor="key" className="form-label mb-0 fw-bold">JTW</label>
                  <textarea
                    id="key"
                    type="text"
                    value={jwt}
                    onChange={e => setJwt(e.target.value)}
                    className="form-control"
                    placeholder="JTW"
                    aria-label="JTW"
                    rows="5"
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

                <div className="w-100 mt-3">
                  <button className="btn btn-primary w-100" onClick={onDecodeJWT}>Decodificar</button>
                </div>

                {jsonToShow && (
                  <>
                   <p className='fw-bold mb-0 mt-4'>Archivo de entrada:</p>
                    <JsonViewer jsonToShow={jsonToShow} />
                  </>
                )}
                
              </div>
            </div>
          </div>
        </div>
        <div className='d-flex justify-content-center mt-4'>
          <Link href="/"><a>Ir a Home</a></Link>
        </div>
      </main>      
    </div>
  )
}

export default DecodeJWT
