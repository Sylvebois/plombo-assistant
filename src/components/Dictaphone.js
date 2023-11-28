import PropTypes from 'prop-types'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { FaMicrophoneLines, FaMicrophoneLinesSlash } from 'react-icons/fa6'

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

  const baseStyle = {
    height: '100px',
    width: '100px',
    marginTop: '2vh',
    marginBottom: '2vh',
    marginLeft: '2vw',
    marginRight: '2vw',
    fontSize: '3vh',
    fontWeight: 'bold',
    borderRadius: '60px',
  }

  const microphoneStyle = {
    height: '50px',
    width: '50px'
  }

  if (listening) {
    return (
      <button
        style={{ ...baseStyle, border: '10px inset rgb(100,255,100)', backgroundColor: 'green' }}
        className='listening'
        onClick={listenClick}
      >
        <FaMicrophoneLines style={microphoneStyle} />
      </button>
    )
  }
  else {
    return (
      <button
        style={{ ...baseStyle, border: '10px inset rgb(255,100,100)', backgroundColor: 'red' }}
        onClick={listenClick}
      >
        <FaMicrophoneLinesSlash style={microphoneStyle} />
      </button>
    )
  }
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