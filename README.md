# UI for iot-api tutorials

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

  By default, the server runs on port `:3000`; otherwise, the next available port (for example, `3001`).
  Visit [http://localhost:3000](http://localhost:3000) in your browser to see the result.

  To view the IoT Starter device dashboard, visit [http://localhost:3000/devices/](http://localhost:3000/devices/)

1. To customize the UI default page, edit the `pages/index.tsx` file. The page auto-updates as you edit the file.

Next.js provides a sample REST API at [http://localhost:3000/api/hello](http://localhost:3000/api/hello). To customize the sample endpoints, edit `pages/api/hello.ts`.

View IoT Starter devices at [http://localhost:3000/devices/](http://localhost:3000/devices/).
To customize the device pages, edit the files located in [`./pages/devices`](./pages/devices/).

## Use with `iot-api-[language]` apps

To use the UI with one of the `iot-api-[language]` example apps, set `API_URL` in `./.env.development` to the URL of the API example app.

The UI automatically routes all `/api/` requests to your API server.
`iot-api-ui` uses Next.js' _catch-all_ routing and [**`rewrites`** module](https://nextjs.org/docs/pages/api-reference/next-config-js/rewrites) to act as a proxy for cross-domain requests to the server.
To customize the URL rewrites, edit `next.config.js`.

## Learn More

Follow step-by-step tutorials to build the IoT Starter app:

- [InfluxDB OSS v2 Python and JavaScript tutorials](https://docs.influxdata.com/influxdb/v2/api-guide/tutorials/)
- [InfluxDB Cloud v2 Python and JavaScript tutorials](https://docs.influxdata.com/influxdb/cloud/api-guide/tutorials/)

To learn more about Next.js, see following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
