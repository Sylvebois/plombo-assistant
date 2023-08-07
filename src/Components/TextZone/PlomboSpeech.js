import PropTypes from 'prop-types'
import { TextToSpeech, useTts } from 'tts-react'

import { PLOMBOSPEECH } from './text'

const Speak = ({ children }) => {
  console.log(children)
  return (
    <>{
      useTts({
        children,
        autoPlay: true,
        lang: 'fr-BE'
      }).ttsChildren
    }
    </>)
}
const PlomboSpeech = ({ page }) => {
  const readAgain = (e) => {
    console.log(e)
  }

  return (
    <Speak onClick={readAgain}>
      <p>{PLOMBOSPEECH[page]}</p>
    </Speak>
  )
}

PlomboSpeech.propTypes = {
  page: PropTypes.string.isRequired
}

export default PlomboSpeech