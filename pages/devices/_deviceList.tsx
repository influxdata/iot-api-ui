import React, { useState, useEffect } from 'react';

export default function DeviceList({ deviceId, onError, isLoading}) {
  const [data, setData] = useState(null)
  
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
  

  return (
      <dl>
      { Array.isArray(data) ?
        data.map(item => (
          <React.Fragment key={`${item.deviceId}_${item.key}`}>
          <dt key={`${item.deviceId}_${item.key}_deviceid`} id={'deviceId_' + item.key}>{item.deviceId}</dt>
          <dd key={`${item.deviceId}_${item.key}_detail`}>Updated: {item.updatedAt}</dd>
          </React.Fragment>
          )
        ) : <p>No device data</p>
      }
      </dl>
  )
}
