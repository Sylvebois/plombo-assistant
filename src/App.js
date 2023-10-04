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

  useEffect(() => sipService.connection(), [])

  if (currPage === 'chat') {
    const chatContainerStyle = {
      border: "3px solid black",
      borderRadius: 10,
      margin: 0,
      padding: 10,
      display: 'inline-block',
      verticalAlign: 'top',
      width: '70vw',
      height: '90vh'
    }

    const chatDivStyle = {
      border: "1px solid red",
      height: '80vh'
    }

    const promptDivStyle = {
      border: "1px solid green",
      height: '10vh',
      verticalAlign: 'top',
      margin: 0
    }

    const inputStyle = {
      height: '9vh',
      width: '60vw',
      marginLeft: '2vw',
      verticalAlign: 'top',
      resize: 'vertical'
    }

    const sendButtonStyle = {
      height: 'inherit',
    }

    const rightSideStyle = {
      border: "3px solid black",
      borderRadius: 10,
      margin: 0,
      padding: 10,
      display: 'inline-block',
      verticalAlign: 'top',
      width: '15vw',
      height: '90vh'
    }

    return (
      <>
        <div style={chatContainerStyle}>
          <div style={chatDivStyle}>chat will come here</div>
          <div style={promptDivStyle}>
            <button style={sendButtonStyle}>Speak</button>
            <textarea style={inputStyle}/>
            <button style={sendButtonStyle}>envoyer</button>
          </div>
        </div>
        <div style={rightSideStyle}>
          <PlomboImg />
          <button style={{ width: '100%' }} onClick={() => navClick('home')}>Retour</button>
        </div>
      </>
    )
  }
  else {

    const divStyle = {
      margin: '0',
      display: 'inline-block',
      verticalAlign: 'middle',
    }

    return (
      <>
        {
          currPage.startsWith('lookingFor') ?
            <MapImg currPage={currPage} className='appear' /> :
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
}

export default App;
