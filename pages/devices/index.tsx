import React, {useState} from 'react';
import {DevicesCard} from './_devicesCard'
import {Device} from './_device'

export default function Devices() {

  return (
          <div className='row'>
            <div className='col'>
              <DevicesCard />
            </div>
             <div className='col-md-9'>
               <Device deviceId='' />
             </div>
          </div>
  )
}
