# Common UI for iot-api tutorials.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and
customized to route `/api` requests to external middleware -
specifically, the InfluxData `iot-app-<js, python, etc.>` example applications.

## Start the Next.js frontend app

1. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

## Use with `iot-api-[language]` apps

To use the UI with one of the `iot-api-[language]` example apps, set `API_URL` in `./.env.development` to the URL of the API example app.

`iot-api-ui` uses a Next.js _catch-all_ route and `http-proxy` to proxy all `/api` requests to your API middleware server.
See `./pages/api/[...path].js` for the `/api` route and proxy configuration.

   ```js
   import httpProxy from 'http-proxy'

   /** Set API_URL to the URL of iot-api-js, iot-api-python, etc. **/
   const API_URL = process.env.API_URL
   const proxy = httpProxy.createProxyServer()
   /** Don't parse JSON bodies on the proxied route **/
   export const config = {
       api: {
           bodyParser: false
       }
   }
   export default (req, res) => {
       proxy.web(req, res, { target: API_URL, changeOrigin: true })
   }
   ```

## Learn More

To learn more about Next.js, see following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Credits

   1. https://maxschmitt.me/posts/next-js-api-proxy/ for the `http-proxy` configuration.
