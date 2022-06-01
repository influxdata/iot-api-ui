import React, { useState } from 'react'
import DeviceRegistrationButton from './_deviceRegistrationButton'
import DeviceList from './_deviceList'

export default function DevicesCard() {
  const [deviceId, setDeviceId] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  function handleChange(event) {
    setError('')
    setDeviceId(event.target.value)
  }

  function handleError(error) {
    console.log(error)
    setError(error)
  }

  return(
      <div className="card">
        <h2>Find or register a device</h2>
        <div className="alert">
        { isLoading && <span>Loading...</span>}
        { error &&
          <span className="alert-danger">{ error }</span>
        }
        </div>
        <form>
          <label>
            Device ID:
            <input type="text" name="register_deviceId" onChange={ handleChange } />
          </label>
          <DeviceRegistrationButton deviceId={ deviceId } onError={ handleError } isLoading={ setIsLoading } />
          <h4>Registered devices</h4>
          <DeviceList deviceId={ deviceId } isLoading={ setIsLoading } onError={ handleError }  />
        </form>
      </div>
  )
}
