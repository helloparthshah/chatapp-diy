import React, {Component} from 'react';
    import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
    import MessageList from './MessageList';
    import Input from './Input';

    var name;
    var number;
    var room;

    class ChatApp extends Component {
        constructor(props) {
            super(props); 
            this.state = {
                currentUser: null,
                currentRoom: {users:[]},
                messages: [],
                users: [],
            }
            this.addMessage = this.addMessage.bind(this);
        }

        componentDidMount() {
            const chatManager = new ChatManager({
                instanceLocator: 'YOUR_INSTANCE_LOCATOR',
                userId: this.props.currentId,
                tokenProvider: new TokenProvider({
                    url: 'YOUR_TOKEN_PROVIDER'
                })
            })
            alert("Wait!")
            chatManager
                .connect()
                .then(currentUser => {
                    this.setState({ currentUser: currentUser })
                    name=currentUser.id
                    return currentUser.subscribeToRoom({
                         roomId: "YOUR_ROOM_ID",
                         messageLimit: 100,
                        hooks: {
                            onMessage: message => {
                                this.setState({
                                    messages: [...this.state.messages, message],
                                })
                            },
                        }
                    })
                })
                .then(currentRoom => {
                    this.setState({
                        currentRoom,
                        users: currentRoom.userIds
                    })
                })
                .catch(error => {
                    alert("User already exists or there was some issue with the server!")
                    console.log(error)
                    window.location.reload(false)
                })
            }

        addMessage(text) {
            this.state.currentUser.sendMessage({
                text,
                roomId: this.state.currentRoom.id
            })
            .catch(error => console.error('error', error));
        }
        
        render() {
            return (
                <div>
                    <h2 className="header">Hey there, {name}!</h2>
                    <div className="test"><MessageList messages={this.state.messages} /></div>
                    <Input className="input-field" onSubmit={this.addMessage} />
                </div>
            )
        }
    }
    export default ChatApp;