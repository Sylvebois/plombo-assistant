import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { FaPaperPlane, FaMicrophone, FaMicrophoneSlash, FaComment, FaSpinner } from 'react-icons/fa'

import { PlomboChatImg } from './PlomboImg'

import aiService from '../services/ai'

const ChatElem = ({ who, txt, sources }) => {
  return (
    <p>
      {who === 'Plombo' ? <PlomboChatImg /> : <FaComment style={{ fill: 'red' }} />}
      <strong> {who}:</strong>
      <br />
      {txt}
      {
        sources.length ?
          sources.map(source => <><br /><i>Cette information provient de {source}</i></>) :
          null
      }
    </p>
  )
}

const Chat = ({ goBack }) => {
  const [currRequest, setCurrRequest] = useState('')
  const [currChat, setCurrChat] = useState([])
  const [respTime, setRespTime] = useState(0)
  const [buttonImage, setButtonImage] = useState(<FaPaperPlane />)

  const div = useRef(null)

  const sendRequest = async () => {
    if (currRequest !== '') {
      const startTime = Date.now()
      const lastChat = { who: 'User', txt: currRequest, sources: [] }
      const newUserChat = currChat.concat(lastChat)
      setCurrChat(newUserChat)
      setCurrRequest('')
      setButtonImage(<FaSpinner className='spinner' />)

      const answer = await aiService.askToAI(lastChat.txt)
      const newPlomboChat = newUserChat.concat([{
        who: 'Plombo',
        txt: answer.content,
        sources: answer.sources
      }])
      setRespTime(Date.now() - startTime)
      setCurrChat(newPlomboChat)
      setButtonImage(<FaPaperPlane />)
    }
  }

  useEffect(() => {
    console.log('useEffect', div)
    if (div) {
      console.log('useEffect on div')
      div.current.scrollTop = div.current.scrollHeight
    }
  }, [currChat])

  const chatContainerStyle = {
    border: '3px solid black',
    borderRadius: 10,
    margin: 0,
    padding: 10,
    display: 'inline-block',
    verticalAlign: 'top',
    width: '70vw',
    height: '90vh'
  }

  const chatDivStyle = {
    height: '80vh',
    overflowY: 'scroll'
  }

  const promptDivStyle = {
    height: '10vh',
    verticalAlign: 'top',
    margin: 0
  }

  const inputStyle = {
    height: '8vh',
    width: '59vw',
    marginLeft: '1vw',
    marginRight: '1vw',
    verticalAlign: 'top',
    resize: 'vertical'
  }

  const sendButtonStyle = {
    height: 'inherit',
    width: '4vw',
    margin: 0
  }

  const rightSideStyle = {
    border: '3px solid black',
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
        <div style={chatDivStyle} ref={div}>
          {
            currChat.length ?
              currChat.map((elem, index) =>
                <ChatElem
                  who={elem.who}
                  txt={elem.txt}
                  sources={elem.sources}
                  key={index}
                />
              ) :
              null
          }
        </div>
        <div style={promptDivStyle}>
          <button style={sendButtonStyle}>
            <FaMicrophone />
          </button>
          <textarea
            value={currRequest}
            style={inputStyle}
            onChange={({ target }) => setCurrRequest(target.value)}
          />
          <button style={sendButtonStyle} onClick={() => sendRequest()}>
            {buttonImage}
          </button>
        </div>
      </div>
      <div style={rightSideStyle}>
        <div>Réponse reçue en : {respTime}ms </div>
        <button style={{ width: '100%' }} onClick={goBack}>Retour</button>
      </div>
    </>
  )
}

export default Chat