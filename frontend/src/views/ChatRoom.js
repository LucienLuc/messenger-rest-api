import React, {useState} from 'react'
import axios from 'axios'

import {Input,Button} from 'antd'

function ChatRoom(props) {
    const [messages, setMessages] = useState([])
    const roomName = 'room1'

    const chatSocket = new WebSocket(
        'ws://'
        + 'localhost:8000'
        + '/ws/chat/'
        + roomName
        + '/'
    );

    chatSocket.onmessage = function(e) {
    const data = JSON.parse(e.data);
    console.log(data);
    setMessages(messages.concat(data.message))
    };

    chatSocket.onclose = function(e) {
    console.error('Chat socket closed unexpectedly');
    };

    const sendMessage = () => {
        console.log('sending message')
        chatSocket.send(JSON.stringify({
        'message': 'allah'
        }));
    }

    const getMessages = () => {
        console.log(props)
    }

    return (
        <div>
            <div class = 'messagebox' style = {{
                height: '300px',
                margin: '10px 10% 10px', 
                padding: '10px', 
                border: '2px solid grey',
                borderRadius:'5px'
            }}>
                {messages.map((value,index) => {
                    return (
                        <div>
                            {value}
                        </div>
                    )
                })}
            </div>
            <Input  style = {{
                margin: '10px 10% 50px',
                padding: '10px'
            }}>
            </Input>
            <Button onClick = {sendMessage}>
                send message
            </Button>
        </div>
    )
}

export default ChatRoom