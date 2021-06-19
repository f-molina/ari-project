import {useState, useEffect} from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import axios from 'axios'
import styles from '../styles/Home.module.css'
import TextViewer from 'components/TextViewer'
import XMLViewer from 'react-xml-viewer'
const JsonViewer = dynamic(() => import('components/JsonViewer'), {ssr: false})

export default function Home() {
  const [fileToProcess, setFileToProcess] = useState(null)
  const [delimiter, setDelimiter] = useState('')
  const [key, setKey] = useState('')
  const [fileName, setFileName] = useState(null)
  const [jsonToShow, setJsonToShow] = useState(null)
  const [textToShow, setTextToShow] = useState(null)

  const [inputXml, setInputXml] = useState(null)
  const [inputTxt, setInputTxt] = useState(null)
  
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
        setFileName(data.fileName)
        setJsonToShow(data.clients || null)
        setInputTxt(data.txt)
        setError(null)
        setTextToShow(null)
        setInputXml(null)
    })
  }

  const onParseXMLToTXT = e => {
    e.preventDefault()

    let upload = new FormData()
    upload.append('file', fileToProcess)
    upload.append('delimiter', delimiter)
    upload.append('key', key)

    axios.post('/api/xml-to-text', upload)
    .then(({data}) => {
      if(!data.success) return setError(data.error)
      setFileName(data.fileName)
      setTextToShow(data.text)
      setInputXml(data.xml)
      setError(null)
      setJsonToShow(null)
      setInputTxt(null)
    })
  }

  const onParseJSONToTXT = e => {
    e.preventDefault()

    let upload = new FormData()
    upload.append('file', fileToProcess)
    upload.append('delimiter', delimiter)
    upload.append('key', key)

    axios.post('/api/json-to-text', upload)
    .then(({data}) => {
      if(!data.success) return setError(data.error)
      setFileName(data.fileName)
      setTextToShow(data.text)
      setInputXml(data.xml)
      setError(null)
      setJsonToShow(null)
      setInputTxt(null)
    })
  }

  const cleanForm = (e) => {
    e.preventDefault()
    setJsonToShow(null)
    setTextToShow(null)
    setFileToProcess(null)
    setFileName(null)
    setInputXml(null)
    setInputTxt(null)
    setError(null)
    setKey('')
    setDelimiter('')
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
          
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Entradas</h5>
                <form autoComplete="off">
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
                    <button className="btn btn-primary" onClick={onParseToXML}>TXT a XML/JSON</button>
                    <button className="btn btn-primary" onClick={onParseXMLToTXT}>XML a TXT</button>
                    <button className="btn btn-primary" onClick={onParseJSONToTXT}>JSON a TXT</button>
                    <button className="btn btn-secondary" onClick={cleanForm}>Limpiar</button>
                  </div>
                  
                </form>

                {inputXml && (
                  <>
                    <p className='fw-bold mb-0 mt-4'>Archivo de entrada:</p>
                    <div className='card p-3'>
                      <XMLViewer xml={inputXml} />
                    </div>
                  </>
                )}

                {inputTxt && (
                  <>
                    <p className='fw-bold mb-0 mt-4'>Archivo de entrada:</p>
                    <TextViewer body={inputTxt} />
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-4 mt-md-0">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Salida</h5>
                {fileName && (
                  <p>Archivo de salida: <a download href={`/${fileName}`}><b>{fileName}</b></a></p>
                )}
                <p className='fw-bold mb-0'>Resultados:</p>
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
