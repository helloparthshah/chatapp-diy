    import { default as Chatkit } from '@pusher/chatkit-server';
    import React, { Component } from 'react';
    import ChatMessage from './Components/ChatMessage';
    import Signup from './Components/Signup'; 
    import ChatApp from './Components/ChatApp'; 

    const chatkit = new Chatkit({
      instanceLocator: "v1:us1:367c69d6-7186-46ee-97bb-f87cbbbecd17",
      key: "b0a5d059-2913-4a6b-b209-86ec8d2ef3b5:eWAcIprpxGojDUVkopLBtc/TbOQ+iUA332EG/hJHvzY="
    })
    class App extends Component {
        constructor(props) {
            super(props);
            this.state = {
                currentUsername: '',
                currentId: '',
                currentView: 'signup'
            }
            this.changeView = this.changeView.bind(this);
            this.createUser = this.createUser.bind(this);
        }

        createUser(username) {
            chatkit.createUser({
                id: username,
                name: username,
            })
            .then((currentUser) => {
                this.setState({
                    currentUsername: username,
                    currentId: username,
                    currentView: 'chatApp'
                })
            }).catch((err) => {
                     if(err.status === 400) {
                    this.setState({
                        currentUsername: username,
                        currentId: username,
                        currentView: 'chatApp'
                    })
                } else {
                    console.log(err.status);
                }
            });
        }

      changeView(view) {
          this.setState({
              currentView: view
          })
      }

      render() {
            let view ='';

            if (this.state.currentView === "ChatMessage") {
                view = <ChatMessage  changeView={this.changeView}/>
            } else if (this.state.currentView === "signup") {
                view = <Signup onSubmit={this.createUser}/>
            } else if (this.state.currentView === "chatApp") {
                view = <ChatApp currentId={this.state.currentId} />
            }
            return (
                <div className="App">
                    {view}
                </div>
            );
        }
    }
    export default App;