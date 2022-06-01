import Layout from './_layout'

export default function IotStarter({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} /> 
    </Layout>
  )
}