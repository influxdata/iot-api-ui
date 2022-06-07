import React, {useState} from 'react';
import {DevicesCard} from './_devicesCard'
import {Device} from './_device'
import {useRouter} from 'next/router'

function Devices() {
  const router = useRouter()
  const deviceId = router.query['deviceId'] || ''

  return (
    <div className='row'>
      <div className='col'>
        <DevicesCard />
      </div>
        <div className='col-md-9'>
          <Device deviceId={deviceId} />
        </div>
    </div>
  )
}

export default Devices
