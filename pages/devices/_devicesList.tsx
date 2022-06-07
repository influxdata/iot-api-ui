import React, { useState, useEffect } from 'react';
import Link from 'next/link'

export function DevicesList({deviceId, onError, isLoading}: 
    {deviceId: string | [],
    onError: (error: string) => void,
    isLoading: (loading: boolean) => void}
  ) {
  const [data, setData] = useState<any[] | null>(null)
  const [selected, setSelected] = useState<any>(null)
  const itemType = 'device'

  useEffect(() => {
    isLoading(true)
    fetch(`/api/devices/${deviceId  || '' }`)
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

  function handleSelectDevice(device: any) {
    setSelected(device)
  }
  
  return (
      <ul className='list-group vh-100 overflow-scroll'>
      { Array.isArray(data) ?
        data.map(item => (
          <React.Fragment key={itemKey(item)}>
            <li className={`list-group-item d-flex justify-content-between align-items-start 
                            ${(item?.deviceId && selected?.deviceId)
                              && (item.deviceId === selected.deviceId)
                              && 'active'}`}
                key={`${itemKey(item)}_${itemType}`}>
               <div className="ms-2 me-auto">
                 <div className="fw-bold">
                   <Link className="btn btn-primary" href={`/devices/${encodeURIComponent(item.deviceId)}`}>
                   {item.deviceId || 'Unknown ID'}</Link>
                 </div>
                 <p>{ `Updated: ${localTime(item.updatedAt)}` }</p>
               </div>
            </li>
          </React.Fragment>
          )
        ) : <p>No devices found</p>
      }
      </ul>
  )
}
