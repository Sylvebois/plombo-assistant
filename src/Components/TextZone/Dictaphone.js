import React from 'react'
import PropTypes from 'prop-types';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import { USERANSWERS } from './text'

const Dictaphone = ({ page, onClick }) => {
  const commands = USERANSWERS[page].map(elem => {
    return {
      command: elem.text.replaceAll(/\.+|\?+|,+|!+/gi, '').trim(),
      callback: ({ resetTranscript }) => {
        resetTranscript();
        onClick(elem.navTo)
      }
    }
  })

  const { transcript } = useSpeechRecognition({ commands })

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  SpeechRecognition.startListening({
    language: 'fr-FR',
    continuous: true
  })

  return (
    <div>
      <p style={{display:"block"}}>Transcript : {transcript}</p>
    </div>
  )
}

Dictaphone.propTypes = {
  page: PropTypes.string.isRequired
}

export default Dictaphone