import React, { useState, useEffect } from 'react';

export default function Device({ device, deviceData, error, isLoading }:
  {device: any, deviceData: any, error: string | null, isLoading: boolean}
  ) {

  function writeSimulatedData() {


  }

  return (
      <>
        <div className='card'>
          <div className="alert">
          { isLoading && <span>Loading...</span> }
          { error &&
            <span className="alert-danger">{ error }</span>
          }
          </div>
          <h2>Device</h2>
            <p>{device.deviceId}</p>
            <p>{JSON.stringify(deviceData)}</p>

        </div>
      </>
  )
}