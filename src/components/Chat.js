import { useState } from 'react'
import PropTypes from 'prop-types'

import aiService from '../services/ai'

const ChatElem = ({ who, txt }) => {
  const imgStyle = {
    borderRadius: 20,
    height: '4h',
    width: '4vh',
    display: 'inline-block'
  }

  const imgSrc = (who === 'Plombo') ? 
    require('../assets/plombo_head.png') : 
    require('../assets/default_user_mini.png')

  return (
    <p>
      <img src={imgSrc} style={imgStyle} />
      <strong> {who}:</strong>
      <br />
      {txt}
    </p>
  )
}

const Chat = ({ goBack }) => {
  const [currRequest, setCurrRequest] = useState('')
  const [currChat, setCurrChat] = useState([])

  const sendRequest = async () => {
    if (currRequest !== '') {
      const newUserChat = currChat.concat({ who: 'User', txt: currRequest })
      setCurrChat(newUserChat)

      const answer = await aiService.askToAI(currRequest)
      const newPlomboChat = newUserChat.concat([{ who: 'Plombo', txt: answer.content.replace('[PLOMBO]', '') }])
      setCurrChat(newPlomboChat)
      setCurrRequest('')
    }
  }

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
    border: '1px solid red',
    height: '80vh',
    overflow: 'auto'
  }

  const promptDivStyle = {
    border: '1px solid green',
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
        <div style={chatDivStyle}>
          {
            currChat.length ?
              currChat.map((elem, index) =>
                <ChatElem
                  who={elem.who}
                  txt={elem.txt}
                  key={index}
                />
              ) :
              null
          }
        </div>
        <div style={promptDivStyle}>
          <button style={sendButtonStyle}>Speak</button>
          <textarea
            value={currRequest}
            style={inputStyle}
            onChange={({ target }) => setCurrRequest(target.value)}
          />
          <button style={sendButtonStyle} onClick={() => sendRequest()}>envoyer</button>
        </div>
      </div>
      <div style={rightSideStyle}>
        <button style={{ width: '100%' }} onClick={goBack}>Retour</button>
      </div>
    </>
  )
}

export default Chat