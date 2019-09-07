import React, { createRef, useContext, useEffect } from 'react'
import styled from 'styled-components'
import ConnectionContext from '../../../Contexts/ConnectionContext'

const ChatWrapper = styled.div`
  border: 1px solid black;
  margin: 2% 2%;
  height: 160px;
`

const ChatDisplay = styled.div`
  border: 1px solid grey;
  border-radius: 5px;
  margin: 1%;
  height: 70%;
  /* overflow: scroll; */
  overflow-y: scroll;
`

const InputArea = styled.div`
  /* border: 1px solid grey; */
  /* border-radius: 5px; */
  display: flex;
  margin: 0% 1%;
  height: 18%;
`

const TextInput = styled.input.attrs(props => ({
  size: props.size || "1em"
}))`
  font-size: 1em;
  border: 1px solid black;
  border-radius: 5px;
  padding: 0 2%;
  width: 90%
`

const SendButton = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  width: 8%;
  font-size: 1em;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ChatText = styled.div`
  margin: 0 5px;
`

const Chat = () => {
  const textInputRef = createRef()
  const { connection, chat } = useContext(ConnectionContext)

  if (!connection || !connection.isConnected()) {
    return <div>chat not available</div>
  }

  useEffect(() => {
    const chatDisplayElement = document.getElementById("chatDisplay")
    chatDisplayElement.scrollTop = chatDisplayElement.scrollHeight
  }, [chat])

  const handleSendButtonClick = () => {
    if (!textInputRef.current) return
    connection.sendMessage(textInputRef.current.value)

    // clean up input field
    textInputRef.current.value = "";
  }

  const handleKeyDown = (e) => {
    if (e.which === 13) { // pressed enter
      if (!textInputRef.current) return
      connection.sendMessage(textInputRef.current.value)
      textInputRef.current.value = "";
    }
  }

  return (
    <ChatWrapper>
      <ChatDisplay id="chatDisplay">
        {
          chat.map(text => {
            return <ChatText key={Math.random()}>{text}</ChatText>
          })
        }
      </ChatDisplay>
      <InputArea>
        <TextInput type="text" ref={textInputRef} onKeyDown={handleKeyDown} />
        <SendButton onClick={handleSendButtonClick}>
          <div>send</div>
        </SendButton>
      </InputArea>
    </ChatWrapper>
  )
}

export default Chat
