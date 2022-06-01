import React from 'react'

export default function DeviceRegistrationButton({ deviceId, onError, isLoading}) {

  function handleRegister() {
    isLoading(true)
    const body = JSON.stringify({ deviceId })

    fetch('/api/devices/create', { method: 'POST', body })
      .then((res) => res.json())
      .then((data) => {
        if(data.error) {
          onError(data.error)
        }
        isLoading(false)
      })
  }

  return (
    <input type="button" value="Register" onClick={ handleRegister } />
  )
}
