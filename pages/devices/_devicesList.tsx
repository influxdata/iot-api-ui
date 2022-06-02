import React, { useState, useEffect } from 'react';

export default function DevicesList({ deviceId, onSelectDevice, onError, isLoading}: 
    { deviceId: string, onSelectDevice: (device: any) => void,
    onError: (error: string) => void, isLoading: (loading: boolean) => void }
  ) {
  const [data, setData] = useState<any[] | null>(null)
  const itemType = 'device'

  useEffect(() => {
    isLoading(true)
    fetch(`/api/devices/${deviceId || ''}`)
    .then((res) => res.json())
    .then((data) => {
      if(Array.isArray(data)) {
        setData(data)
      }
      if(data.error) {
        onError(data.error)
      }
      isLoading(false)
    })
  }, [deviceId])

  const itemKey = (item: any) => `${item.deviceId}_${item.key}`
  
  function localTime(time: any) {
    const date = new Date(time)
    return date.toLocaleString()
  } 
  
  return (
      <dl>
      { Array.isArray(data) ?
        data.map(item => (
          <React.Fragment key={itemKey(item)}>
            <dt key={`${itemKey(item)}_${itemType}`} id={`${itemKey(item)}_${itemType}`}
                onClick={() => onSelectDevice(item)}>{item.deviceId}</dt>
            <dd key={`${itemKey(item)}_detail`}>{ `Last updated: ${localTime(item.updatedAt)}` }</dd>
          </React.Fragment>
          )
        ) : <p>No devices found</p>
      }
      </dl>
  )
}
