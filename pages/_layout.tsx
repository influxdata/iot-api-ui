import Head from 'next/head'

export default function Layout({ children }) {
  return (
    <div className={'container'}>
      <Head>
        <title>IoT Starter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={'main'}>{children}</main>

      <footer>
      </footer>
    </div>
  )
}
