import { useState, useEffect } from 'react'

import MapImg from './components/MapImg'
import PlomboImg from './components/PlomboImg'
import Talker from './components/Talker'
import Dictaphone from './components/Dictaphone'
import ChoiceButtons from './components/ChoiceButtons'

import sipService from './services/sip'
import jokeService from './services/joke'

import { PLOMBOSPEECH } from './text'

const App = () => {
  const [currPage, setCurrPage] = useState('home')
  const [currSpeech, setCurrSpeech] = useState(PLOMBOSPEECH[currPage])

  const navClick = async (dest) => {
    if(dest.startsWith('phone')) {
      const groupToCall = dest.substring(5)
      //Lance un appel vers le groupe
    }
    else if(dest === 'joke') {
      const joke = await jokeService.getJoke()
      console.log(joke[0].data.content)
      setCurrPage(dest)
      setCurrSpeech(joke[0].data.content.text_head)
    }
    else {
      setCurrPage(dest)
      setCurrSpeech(PLOMBOSPEECH[dest])
    }
  }

  const divStyle = {
    margin: '0',
    display: 'inline-block',
    verticalAlign: 'middle',
  }

  useEffect(() => sipService.connection(), [])

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
