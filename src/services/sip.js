import JsSIP from 'jssip'

let ua

const connection = () => {
  const socket = new JsSIP.WebSocketInterface(`wss://${process.env.REALM}`)
  const config = {
    sockets: [socket],
    uri: `sip:${process.env.SIPUSER}@${process.env.REALM}`,
    password: process.env.SIPPASS,
    display_name: 'BOT',
    realm: process.env.REALM
  }
  ua = new JsSIP.UA(config)
  console.log(ua)
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
    'mediaConstraints': { 'audio': true, 'video': true }
  }

  return ua.call(`sip:${groupToCall}@${process.env.REALM}`, options)
}

export default { connection, call }