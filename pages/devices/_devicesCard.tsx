import React, { useState } from 'react'
import DeviceRegistrationButton from './_deviceRegistrationButton'
import {DevicesList} from './_devicesList'

export function DevicesCard() {
  const [deviceId, setDeviceId] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  function handleChange(event: any) {
    setError('')
    setDeviceId(event.target.value)
  }

  function handleError(error: string) {
    console.log(error)
    setError(error)
  }

  return(
      <div className='card'>
        <h5 className='card-title' >Devices</h5>
        <form className='card-body row'>
          <label htmlFor='findOrRegisterDevice_IdInput' className="form-label">
            Find or register a device ID
          </label>
          <input type="text" id='findOrRegisterDevice_IdInput' name="register_deviceId" className="form-control col-md-10" onChange={ handleChange } />
          <DeviceRegistrationButton deviceId={ deviceId } onError={ handleError } isLoading={ setIsLoading } />
          <h5 className='mt-4'>Registered devices</h5>
          { isLoading && 
            <div className="alert"><span>Loading...</span></div>
          }
          { error &&
            <div className="alert-danger">{ error }</div>
          }
          <DevicesList listFilter={ deviceId } isLoading={ setIsLoading } onError={ handleError }  />
        </form>
      </div>
  )
}
