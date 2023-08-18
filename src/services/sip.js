import JsSIP from 'jssip'

let ua

const connection = () => {
  const socket = new JsSIP.WebSocketInterface(`wss://${process.env.REACT_APP_SIP_PROXYS}`)
  socket.via_transport='UDP'

  const config = {
    sockets: socket,
    uri: `sip:${process.env.REACT_APP_SIP_USER}@${process.env.REACT_APP_SIP_REALM}`,
    password: process.env.REACT_APP_SIP_PASS,
    display_name: 'BOT',
    realm: process.env.REACT_APP_SIP_REALM,
  }

  ua = new JsSIP.UA(config)
  //ua.start()
}

const call = (groupToCall) => {
  const eventHandlers = {
    'progress': (e) => console.log('call is in progress'),
    'failed': (e) => console.log('call failed with cause: ' + e.data.cause),
    'ended': (e) => console.log('call ended with cause: ' + e.data.cause),
    'confirmed': (e) => console.log('call confirmed')
  };

  const options = {
    'eventHandlers': eventHandlers,
    'mediaConstraints': { 'audio': true, 'video': false }
  }

  return ua.call(`sip:${groupToCall}@${process.env.REALM}`, options)
}

export default { connection, call }