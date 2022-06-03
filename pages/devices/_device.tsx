import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'

/* Wrap DevicePlot with a dynamic import to disable server-side rendering.
 * Prevents `self is undefined` errors caused by Giraffe when rendered
 * with Node.
 */
const DynamicDevicePlotWithNoSSR = dynamic(
  () => import('./_devicePlot'),
  { ssr: false }
)

export default function Device({ deviceId }: {deviceId: string}) {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [device, setDevice] = useState<any[] | null>(null)
  const [data, setData] = useState<any | null>(null)

  const getDeviceData = (deviceId: string) => {
    setIsLoading(true)
    setError(null)
    fetch(`/api/devices/${deviceId}/measurements`,
          { headers: { "Accept": "application/csv" } }
    )
    .then((res) => {
      if(res.ok) {
        return res.text()
      } else {
        setError(`Device data ${res.statusText}`)
        setIsLoading(false)
      }
    })
    .then((data) =>{
      setData(data)
      setIsLoading(false)
    })
  }
  
  const getDevice = (deviceId: string) => {
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

  useEffect(() => {
    deviceId &&
    getDevice(deviceId)
    getDeviceData(deviceId)
  }, [deviceId])

  function writeSimulatedData() {
    fetch('/api/devices/generate', {
      method: 'POST',
      body: JSON.stringify({ deviceIds: [deviceId] }),
      headers: { "Content-Type": "application/json" }
    })
    .then((res) => {
      if(res.ok) {
        getDeviceData(deviceId)
      } else {
        setError(res.statusText)
      }
    })

  }

  return (
    deviceId ?
      <div className='card'>
        <div className="alert">
        { isLoading && <span>Loading...</span> }
        { error &&
          <span className="alert-danger">{ error }</span>
        }
        </div>
        <h2>Device</h2>
          <p>{deviceId}</p>
          <p><button onClick={ writeSimulatedData }>Generate data for this device</button></p>
          { data &&
            <div><DynamicDevicePlotWithNoSSR csv={data} title={'Measurements'} lastUpdated={''} /></div>
          }     
      </div> : <></>
  )
}