import Layout from './_layout'
import 'bootstrap/dist/css/bootstrap.css'

export default function IotStarter({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} /> 
    </Layout>
  )
}