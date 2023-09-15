import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useTts } from 'tts-react'

const Talker = ({ currSpeech }) => {
  const startingValue = typeof (currSpeech) === 'object' ? currSpeech[0] + ' ' + currSpeech[1] : currSpeech
  const [currTxt, setCurrTxt] = useState(startingValue)
  const [revealClass, setReveal] = useState('toReveal')
  const { ttsChildren, play } = useTts({
    children: currTxt,
    markTextAsSpoken: true,
    autoPlay: true,
  })

  const handleClick = () => {
    setCurrTxt(currSpeech[2])
    setReveal('reveal')
  }

  useEffect(() => {
    if(typeof (currSpeech) === 'object') { 
      const introTxt = currSpeech[0] + ' ' + currSpeech[1]
      const answer = currSpeech[2]

      if(currTxt !== introTxt && currTxt !== answer) {
        setCurrTxt(introTxt)
      }
    }
    else if (currSpeech !== currTxt) {
      setCurrTxt(currSpeech)
    }
  }, [currSpeech, currTxt])

  if (typeof (currSpeech) === 'object') {
    return (
      <>
        <p>
          { currSpeech[0] }
          <br />
          { currSpeech[1] === '' ? null : currSpeech[1] }
        </p>
        {
          currSpeech[2] === '' ?
            null :
            <p className={revealClass} onClick={handleClick}>{currSpeech[2]}</p>
        }
      </>
    )
  }
  else {
    return (<p>{currSpeech}</p>)
  }
}

Talker.propTypes = {
  currSpeech: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]).isRequired,
}

export default Talker