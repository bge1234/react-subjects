////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Create a chat application using the utility methods we give you
//
// Need some ideas?
//
// - Cause the message list to automatically scroll as new
//   messages come in
// - Highlight messages from you to make them easy to find
// - Highlight messages that mention you by your GitHub username
// - Group subsequent messages from the same sender
// - Create a filter that lets you filter messages in the chat by
//   sender and/or content
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { render, findDOMNode } from 'react-dom'
import { login, sendMessage, subscribeToMessages } from './utils/ChatUtils'
import './styles'

function groupMessages(messages) {
  const groupedMessages = []
  let previousUID = null
  messages.forEach((message) => {
    if (message.uid === previousUID) {
      const prevUser = groupedMessages[groupedMessages.length - 1]
      prevUser.push(message)
    } else {
      previousUID = message.uid
      groupedMessages.push([ message ])
    }
  })
  return groupedMessages
}

const PinToBottom = React.createClass({
  componentWillUpdate() {
    const { scrollTop, scrollHeight, clientHeight } = findDOMNode(this)
    const distanceToBottom = scrollHeight - (scrollTop + clientHeight)
    this.autoScroll = distanceToBottom < 10
  },

  componentDidUpdate() {
    const node = findDOMNode(this)
    if (this.autoScroll)
      node.scrollTop = node.scrollHeight
  },

  render() {
    return this.props.children
  }
})

const Chat = React.createClass({
  getInitialState() {
    return {
      auth: null,
      messages: [],
      currentMessage: ''
    }
  },

  componentDidMount() {
    login((err, auth) => {
      if (auth) {
        this.setState({ auth: auth })
        subscribeToMessages((messages) => {
          this.setState({ messages: messages })
        })
      }
    })
  },

  handleMessageEntry(event) {
    this.setState({currentMessage: event.target.value})
  },

  handleSendMessage(event) {
    event.preventDefault()
    sendMessage(this.state.auth.uid, this.state.auth.github.username, this.state.auth.github.profileImageURL, this.state.currentMessage)
    this.refs.message.value = ''
    this.autoScroll = true
  },

  render() {
    const { messages } = this.state

    return (
      <div className="chat">
        <header className="chat-header">
          <h1 className="chat-title">HipReact</h1>
          <p className="chat-message-count"># messages: {messages.length}</p>
        </header>
        <PinToBottom>
          <div className="messages">
            <ol className="message-groups">
              {groupMessages(messages).map((group) => (
                <li className="message-group">
                  <div className="message-group-avatar">
                    <img src={group[0].avatarURL}/>
                  </div>
                  <ol className="messages">
                    {group.map((message) => (
                      <li className="message">{message.text}</li>
                    ))}
                  </ol>
                </li>
              ))}
            </ol>
          </div>
        </PinToBottom>
        <form
          className="new-message-form"
          onSubmit={this.handleSendMessage}
        >
          <div className="new-message">
          <input
            ref="message"
            type="text"
            placeholder="say something..."
            onChange={this.handleMessageEntry}
            defaultValue={this.state.currentMessage}
        />
          </div>
        </form>
      </div>
    )
  }
})

render(<Chat/>, document.getElementById('app'))
