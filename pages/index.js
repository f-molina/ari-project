import { useEffect } from 'react'
import axios from 'axios'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  useEffect(() => {
    axios.post('/api/text-to-xml')
      .then(({data}) => {
        console.log(data)
      })
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Proyecto ARI
        </h1>
      </main>
    </div>
  )
}
