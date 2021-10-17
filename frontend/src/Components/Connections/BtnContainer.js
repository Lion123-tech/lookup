import React, { useEffect } from 'react'
import { ConnectBtn } from '../Buttons/ConnectButton'

function BtnContainer({ btnname, handleconnectbtn, handleacceptrequestbtn }) {
    useEffect(() => {
        console.log("bun name", btnname);
    }, [btnname])
    return (btnname === "connect" ? <ConnectBtn
        variant="outlined" color="primary" onClick={() => handleconnectbtn()}>
        connect
    </ConnectBtn> : (btnname == "accept request") ?
        <ConnectBtn
            variant="outlined" color="primary" onClick={() => handleacceptrequestbtn()}>
            accept request
        </ConnectBtn> : (btnname == "connection") ? 
          <ConnectBtn
          variant="outlined" disabled color="primary">
          connected
      </ConnectBtn> :
        <ConnectBtn
            variant="outlined" disabled color="primary">
            request sent
        </ConnectBtn>)
}

export default BtnContainer
