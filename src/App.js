import { useState, useEffect } from 'react'

import MapImg from './components/MapImg'
import PlomboImg from './components/PlomboImg'
import Talker from './components/Talker'
import Dictaphone from './components/Dictaphone'
import ChoiceButtons from './components/ChoiceButtons'

import aiService from './services/ai'
import sipService from './services/sip'
import jokeService from './services/joke'

import { PLOMBOSPEECH } from './text'

const App = () => {
  const [currPage, setCurrPage] = useState('home')
  const [currSpeech, setCurrSpeech] = useState(PLOMBOSPEECH[currPage])

  const navClick = async (dest) => {
    if (dest.startsWith('phone')) {
      const groupToCall = dest.substring(5)
      //Lance un appel vers le groupe
      sipService.call(groupToCall)
    }
    else if (dest === 'joke') {
      const joke = await jokeService.getJoke()
      const textHead = joke[0].data.content.text_head
      const text = joke[0].data.content.text
      const textHidden = joke[0].data.content.text_hidden

      setCurrPage(dest)
      setCurrSpeech([textHead, text, textHidden])
    }
    else {
      setCurrPage(dest)
      setCurrSpeech(PLOMBOSPEECH[dest])
    }
  }

  const test = async () => { await aiService.askAI('Bonjour') }

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
      <button onClick={() => test()}>test</button>
    </>
  )
}

export default App;
