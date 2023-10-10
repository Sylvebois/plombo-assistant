import PropTypes from 'prop-types'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

import MicroImg from './MicroImg'
import { USERANSWERS } from '../text'

const Dictaphone = ({ currPage, voiceClick }) => {
  const commands = USERANSWERS[currPage].map(elem => {
    return {
      command: elem.text.replaceAll(/\.+|\?+|,+|!+/gi, '').trim(),
      callback: ({ resetTranscript }) => {
        resetTranscript()
        voiceClick(elem.navTo)
      }
    }
  })

  const { transcript, listening, resetTranscript } = useSpeechRecognition({ commands })

  const listenClick = () => {
    if (listening) {
      SpeechRecognition.stopListening()
        .then(() => resetTranscript())
    }
    else {
      SpeechRecognition.startListening({ continuous: true })
    }
  }

  const style = {
    height: '100px',
    width: '100px',
    marginTop: '2vh',
    marginBottom: '2vh',
    marginLeft: '2vw',
    marginRight: '2vw',
    fontSize: '3vh',
    fontWeight: 'bold',
    border: `10px inset ${listening ? 'rgb(100,255,100)' : 'rgb(255,100,100)'}`,
    borderRadius: '60px',
    backgroundColor: listening ? 'green' : 'red'
  }

  return (
    <button style={style} className={listening ? 'listening' : ''} onClick={listenClick}>
      <MicroImg />
    </button>
  )
}


Dictaphone.propTypes = {
  currPage: PropTypes.string.isRequired,
  voiceClick: PropTypes.func.isRequired
}

export default Dictaphone

/* To debug text
  return (
    <div>
      <button style={style} onClick={listenClick}>
        {listening ? 'Stop' : 'Ecouter'}
      </button>
      <p>{transcript}</p>
    </div>
  )
*/