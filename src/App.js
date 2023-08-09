import { useState } from 'react'

import MapImg from './Components/MapImg'
import PlomboImg from './Components/PlomboImg'
import Talker from './Components/Talker'
import Dictaphone from './Components/Dictaphone'
import ChoiceButtons from './Components/ChoiceButtons'

import { PLOMBOSPEECH } from './text'

const App = () => {
  const [currPage, setCurrPage] = useState('home')
  const [currSpeech, setCurrSpeech] = useState(PLOMBOSPEECH[currPage])

  const navClick = (dest) => {
    setCurrPage(dest)
    setCurrSpeech(PLOMBOSPEECH[dest])
  }

  const divStyle = {
    margin: '0',
    display: 'inline-block',
    verticalAlign: 'middle',
  }

  return (
    <>
      {
        currPage.startsWith('lookingFor') ?
          <MapImg currPage={currPage} /> :
          null
      }
      <PlomboImg />
      <Talker currSpeech={currSpeech} />
      <div style={divStyle}>
        <Dictaphone currPage={currPage} voiceClick={navClick} />
      </div>
      <div style={divStyle}>
        <ChoiceButtons currPage={currPage} handleClick={navClick} />
      </div>
    </>
  )
}

export default App;
