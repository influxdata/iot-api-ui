import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'

/* Wrap DevicePlot with a dynamic import to disable server-side rendering.
 * Prevents `self is undefined` errors caused by Giraffe when rendered
 * with Node.
 */
const DynamicDevicePlotWithNoSSR = dynamic(
  () => import('./_devicePlot').then(mod => mod.DevicePlot),
  { ssr: false }
)

export function Device({deviceId}: {deviceId: string | string[]}) {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [device, setDevice] = useState<any[] | null>(null)
  const [data, setData] = useState<string[] | []>([])
  deviceId = Array.isArray(deviceId) ? deviceId[0] : deviceId

  useEffect(() => {
    deviceId && getDevice()
  }, [deviceId])

  useEffect(() => {
    getFieldData()
  }, [deviceId])

  function getFieldData() {
    if(!device) {
      return
    }
    setError(null)
    setIsLoading(true)
    const results: string[] = []
    const fields  = ['Humidity', 'Pressure', 'Temperature']
    fields.forEach(field => {
      getMeasurements(field)
      .then(res => {
        if(res.ok) {
          return res.text()
        } else {
          setError(`${field} error: ${res.statusText}`)
          return ''
        }
      })
      .then(text => {
        results.push(text)
        console.log(results)
        setData(results)
        setIsLoading(false)
      })
    })
  }

  const getDevice = () => {
    setIsLoading(true)
    fetch(`/api/devices/${deviceId}`)
    .then((res) => res.json())
    .then((data) => {
      if(Array.isArray(data)) {
        setDevice(data)
      }
      if(data.error) {
        setError(data.error)
      }
      setIsLoading(false)
    })
  }

  const getMeasurements = (field: string) => {
    const query =
        `from(bucket: "${process.env.NEXT_PUBLIC_INFLUX_BUCKET}")
         |> range(start: -60d)
         |> filter(fn: (r) => r._measurement == "environment" and r.device == "${deviceId}" )
         |> filter(fn: (r) => r._field == "${field}" )
         |> aggregateWindow(every: 1h, fn: mean, createEmpty: false)
         |> yield(name: "mean")
         `
    return (
      fetch(`/api/devices/${deviceId}/measurements`,
          { method: 'POST',
            headers: { 'Accept': 'application/csv', 'Content-Type': 'application/json'},
            body: JSON.stringify({ query })
          })
    )
  }

  function writeSimulatedData() {
    fetch('/api/devices/generate', {
      method: 'POST',
      body: JSON.stringify({ deviceIds: [deviceId] }),
      headers: { "Content-Type": "application/json" }
    })
    .then((res) => {
      if(!res.ok) {
        setError(`Writing data: ${res.statusText}`)
      }
      getFieldData()
    })
  }

  return (
      <div>
        <div className="alert">
        { isLoading && <span>Loading...</span> }
        { error &&
          <span className="alert-danger">{ error }</span>
        }
        </div>
        <h5>Device</h5>
        {device && <h4>{deviceId}</h4>}
        {device &&
          <p><button onClick={ writeSimulatedData }>Generate data for this device</button></p>
        }
        {data.map((csv, i) =>
          <div className='card-body'>
            <div key={`${i}-line`}><DynamicDevicePlotWithNoSSR csv={csv} plot='line' /></div>
            <div key={`${i}-table`}><DynamicDevicePlotWithNoSSR csv={csv} plot='table' title='' /></div>
          </div>
      )}     
      </div>
  )
}