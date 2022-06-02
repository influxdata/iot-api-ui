import React, { useState, useEffect } from 'react';
import DevicesCard from './_devicesCard'
import Device from './_device'

export default function Devices() {
  const [ device, setDevice ] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [deviceData, setDeviceData] = useState<any[] | null>(null)

  function handleSelectDevice(selected: any) {
    setDevice(selected)
    getDeviceData(selected.deviceId)
  }

  function getDeviceData(deviceId: string) {
    setIsLoading(true)
    setError(null)
    fetch(`/api/data/${deviceId || ''}`)
    .then((res) => {
      if(res.ok) {
        const json = res.json()
        Array.isArray(json) && setDeviceData(json)
        setIsLoading(false)
      } else {
        setError(res.statusText)
        setIsLoading(false)
      }
    })
  }

  return (
    <>
      { device ?
          <div>
            <DevicesCard onSelectDevice={ handleSelectDevice } />
            <Device device={device} deviceData={deviceData} error={error} isLoading />
          </div>
          : <DevicesCard onSelectDevice={ handleSelectDevice } />
      }
    </>
  )
}
