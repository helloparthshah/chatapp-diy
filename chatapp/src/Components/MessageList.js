import React, {Component} from 'react';

class MessageList extends Component {
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
      }
      
      componentDidMount() {
        this.scrollToBottom();
      }
      
      componentDidUpdate() {
        this.scrollToBottom();
      }
    render() {
        return(
            <ul className="message-list">
                {this.props.messages.map((message, index) => (
                    <li key={index}>
                        <h4 className="message-sender">{message.senderId}:</h4>
                        <p className="message-text">{message.text}</p>
                    </li>
                ))}
                <li></li>
                <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}></div>
            </ul>
        )
    }
}
export default MessageList;