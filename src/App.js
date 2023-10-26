import { useState, useEffect } from 'react'

import MapImg from './components/MapImg'
import Talker from './components/Talker'
import Dictaphone from './components/Dictaphone'
import ChoiceButtons from './components/ChoiceButtons'
import Chat from './components/Chat'
import PdfViewer from './components/PdfViewer'
import { PlomboImg } from './components/PlomboImg'

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

  useEffect(() => sipService.connection(), [])

  const divStyle = {
    margin: '0',
    display: 'inline-block',
    verticalAlign: 'middle',
  }

  if (currPage === 'chat') {
    return (<Chat goBack={() => setCurrPage('home')} />)
  }
  else if(currPage === 'catalog') {
    return(<PdfViewer goBack={() => setCurrPage('home')} />)
  }
  else {
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
      </>
    )
  }
}

export default App;
