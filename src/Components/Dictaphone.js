import PropTypes from 'prop-types'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

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
    marginRight:'2vw',
    fontSize: '3vh',
    fontWeight: 'bold',
    borderWidth: '0px',
    borderRadius: '60px',
    backgroundColor: listening ? 'red' : 'green'
  }

  return (
    <button style={style} onClick={listenClick}>
      {listening ? 'Stop' : 'Parler'}
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