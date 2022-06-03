import React, { useState, useEffect } from 'react';
import DevicesCard from './_devicesCard'
import Device from './_device'

export default function Devices() {
  const [ device, setDevice ] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [deviceData, setDeviceData] = useState<any[] | null>(null)

  function handleSelectDevice(selected: { deviceId: string }) {
    setDevice(selected)
  }

  return (
    <>
      { device ?
          <div>
            <DevicesCard onSelectDevice={ handleSelectDevice } />
            <Device deviceId={device.deviceId} />
          </div>
          : <DevicesCard onSelectDevice={ handleSelectDevice } />
      }
    </>
  )
}
