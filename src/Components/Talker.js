import PropTypes from 'prop-types'
import { TextToSpeech } from 'tts-react'

const Talker = ({ currSpeech }) => {
  return (
    <TextToSpeech
      markTextAsSpoken
      align="horizontal"
      size="medium"
      position="leftCenter"
      lang="fr-BE"
      autoPlay={true}
    >
      <p> {currSpeech} </p>
    </TextToSpeech>
  )
}

Talker.propTypes = {
  currSpeech: PropTypes.string.isRequired,
}

export default Talker