import PropTypes from 'prop-types'
import { TextToSpeech } from 'tts-react'

const Talker = ({ currSpeech }) => {
  let text

  if (typeof (currSpeech) === 'object') {
    text = <>
      <p>{currSpeech[0]}</p>
      {currSpeech[1] === "" ? null : <p>{currSpeech[1]}</p>}
      {currSpeech[2] === "" ? null : <p>{currSpeech[2]}</p>}
    </>
  }
  else {
    text = <p>{currSpeech}</p>
  }

  return (
    <>
      <TextToSpeech
        markTextAsSpoken
        align="horizontal"
        size="medium"
        position="leftCenter"
        lang="fr-BE"
        autoPlay={true}
      >
        {text}
      </TextToSpeech>
      {
        typeof (currSpeech) === 'object' ?
          <p style={{ fontSize: "2vh" }}>Source: blablagues.net</p> :
          null
      }
    </>
  )
}

Talker.propTypes = {
  currSpeech: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]).isRequired,
}

export default Talker