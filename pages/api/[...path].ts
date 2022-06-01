import httpProxy from 'http-proxy'

/** Set API_URL to the URL of iot-api-js, iot-api-python, etc. **/
const API_URL = process.env.API_URL
const proxy = httpProxy.createProxyServer()

export default (req, res) => {
    proxy.web(req, res, { target: API_URL, changeOrigin: true })
}