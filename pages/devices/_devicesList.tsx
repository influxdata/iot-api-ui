import React, {useState, useEffect} from 'react';
import Link from 'next/link'
import {useRouter} from 'next/router'

export function DevicesList({listFilter, onError, isLoading}: 
    {listFilter: string | [],
    onError: (error: string) => void,
    isLoading: (loading: boolean) => void})
{
  const [data, setData] = useState<any[] | null>(null)
  const itemType = 'device'
  const router = useRouter()
  const deviceId = router.query['deviceId'] || ''
  const itemKey = (item: any) => `${item.deviceId}_${item.key}`

  useEffect(() => {
    isLoading(true)
    fetch(`/api/devices/${listFilter || '' }`)
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
  }, [listFilter])

  function localTime(time: any) {
    const date = new Date(time)
    return date.toLocaleString()
  }

  const style = `
    .link-
  `
  return (
      <ul className='list-group vh-100 overflow-scroll'>
      { Array.isArray(data) ?
          data.map((item, i) => (
            <li className={`list-group-item d-flex justify-content-between align-items-start 
                            ${deviceId.includes(item.deviceId) && 'active'}`}
                key={`${itemKey(item)}${i}`}>
                <div className="ms-2 me-auto">
                  <div className="fw-bold">
                    {deviceId.includes(item.deviceId) ?
                      (item.deviceId || 'Unknown ID') :
                      <Link href={`/devices/${encodeURIComponent(item.deviceId)}`}>
                          <button className='btn btn-primary'>
                              {item.deviceId || 'Unknown ID'}
                            </button>
                      </Link>
                    }
                  </div>
                  <small className='mt-1'>{`Updated: ${localTime(item.updatedAt)}`}</small>
                </div>
            </li>
            )
        ) : <p>No devices found</p>
      }
      </ul>
  )
}

