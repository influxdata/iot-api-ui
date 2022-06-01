import React, { useState, useEffect } from 'react';

export default function DeviceList({ deviceId, onError, isLoading}) {
  const [data, setData] = useState(null)
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

  const itemKey = item => `${item.deviceId}_${item.key}`
  
  return (
      <dl>
      { Array.isArray(data) ?
        data.map(item => (
          <React.Fragment key={itemKey(item)}>
          <dt key={`${itemKey(item)}_${itemType}`} id={`${itemKey(item)}_${itemType}`}>{item.deviceId}</dt>
          <dd key={`${itemKey(item)}_detail`}>Updated: {item.updatedAt}</dd>
          </React.Fragment>
          )
        ) : <p>No devices</p>
      }
      </dl>
  )
}
