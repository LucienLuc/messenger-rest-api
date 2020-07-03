import React, {useState} from 'react'
import axios from 'axios'

import {SettingFilled} from '@ant-design/icons';

import {Input,Button, Descriptions, Space, Row, Col} from 'antd'

function ChatRoom(props) {
    const [messages, setMessages] = useState([])
    const roomName = 'room1'

    // const chatSocket = new WebSocket(
    //     'ws://'
    //     + 'localhost:8000'
    //     + '/ws/chat/'
    //     + roomName
    //     + '/'
    // );

    // chatSocket.onmessage = function(e) {
    // const data = JSON.parse(e.data);
    // console.log(data);
    // setMessages(messages.concat(data.message))
    // };

    // chatSocket.onclose = function(e) {
    // console.error('Chat socket closed unexpectedly');
    // };

    // const sendMessage = () => {
    //     console.log('sending message')
    //     chatSocket.send(JSON.stringify({
    //     'message': 'allah'
    //     }));
    // }

    const getMessages = () => {
        console.log(props)
    }

    const handle = () => {
        console.log(props.location.state.title)
    }

    return (
        <div>
            <Row justify = 'center'>
            {/* <Button onClick = {handle}>
                test prop passing
            </Button>
            <SettingFilled></SettingFilled> */}
            <Col>
            <div className = 'info' style = {{
                height: '250px',
                width: '200px',
                margin: '20px',
                border: '2px solid grey',
                borderRadius:'5px'
            }}>
                <Descriptions title = 'Room Info' size = 'small' layout = 'vertical' column = {1} bordered = 'true'>
                    <Descriptions.Item label = 'Name'> {props.location.state.data.title} </Descriptions.Item>
                    <Descriptions.Item label = 'Description'> {props.location.state.data.description} </Descriptions.Item>
                </Descriptions>
            </div>
            </Col>
            <Col flex = 'auto'>
            <div className = 'messagebox' style = {{
                height: '300px',
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
            </Col>
            <Col>
            <div className = 'memberslist' style = {{
                height: '250px',
                width: '200px',
                margin: '20px',
                border: '2px solid grey',
                borderRadius:'5px'
            }}>
            </div>
            </Col>
            </Row>
            <Input  style = {{
                margin: '10px 10% 50px',
                padding: '10px'
            }}>
            </Input>
            {/* add onclick function */}
            <Button>
                send message
            </Button>
        </div>
    )
}

export default ChatRoom