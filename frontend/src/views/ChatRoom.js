import React, {useState} from 'react'
import axios from 'axios'

import {SettingFilled} from '@ant-design/icons';

import {Input,Button, Descriptions, Row, Col, Modal, List} from 'antd'

const {Search} = Input;

function ChatRoom(props) {
    const accessToken = localStorage.getItem('accessToken')
    const [currentUser, setUser] = useState()

    const config = {
        headers: {
          'Authorization': `JWT ${accessToken}`,
        }
      }
    const [messages, setMessages] = useState([])

    const [settingsVisible, setSettingsVisible] = useState(false)
    const [roomTitle, setRoomName] = useState(props.location.state.data.title)
    const [roomDescription, setRoomDescription] = useState(props.location.state.data.description)

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

    const [memberList, setMemberList] = useState() 

   window.onload = () => {
        console.log('here')
        const temp = props.location.state.data.members
        setMemberList(props.location.state.data.members)
   }

    const handle = () => {
        console.log(props.location.state.title)
    }

    const handleSettingsClick = () => {
        setSettingsVisible(true)
    }

    const handleOk = () => {
        setSettingsVisible(false)
    }

    const handleCancel = () => {
        setSettingsVisible(false)
    }
    const sendMessage = () => {
        //Get who is sending message
        axios.get('http://127.0.0.1:8000/auth/users/me/', config).then(response => {
            return response.data.username
        }).then((response) => {
        const input = {
            message: 'Greetings',
            sender: {username: response},
            room: {title: roomTitle}
        }
        console.log(input)

        axios.post('http://127.0.0.1:8000/message/', input, config).then(response => {
            console.log(response)
        }).catch(error => (console.log(error)))
    })}

    const getMessages = () => {
        axios.get('http://127.0.0.1:8000/room/' + roomTitle + '/', config).then(response => {
            console.log(response.data.messages)
            return response.data.messages
        }).catch(error => (console.log(error))).then((messages) => {
            axios.get('http://127.0.0.1:8000/message/', config).then(response => {
                console.log(response.data[0])
            })
        })
    }

    const handleEditTitle = (e) => {
        console.log(e.target.value)
        const config = {
            'roomName': roomTitle,
            'title' : 'newroom'
    }
        axios.post('http://127.0.0.1:8000/chat/changeRoomTitle',config).then(response => {
            console.log(response)
        })
    }

    const handleEditDescription = (e) => { 
        console.log(e.target.value)
        const config = {
            'roomName': roomTitle,
            'description' : 'new description'
    }
        axios.post('http://127.0.0.1:8000/chat/changeDescription',config).then(response => {
            console.log(response)
        })
    }
    return (
        <div>
            <Button onClick = {getMessages}>getMessages</Button>
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
                borderRadius:'5px',
                padding: '4px'
            }}>
                <SettingFilled onClick = {handleSettingsClick}/>
                <Descriptions 
                    title = 'Room Info' 
                    size = 'small' 
                    layout = 'vertical' 
                    column = {1} 
                    bordered = 'true'>
                    <Descriptions.Item label = 'Name'> {roomTitle} </Descriptions.Item>
                    <Descriptions.Item label = 'Description'> {roomDescription} </Descriptions.Item>
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
                borderRadius:'5px',
                padding: '4px'
            }}>
                <List
                    header = 'Members'
                    dataSource = {memberList}
                    renderItem = {item => (
                    <List.Item>
                        {item}
                    </List.Item>
                    )}
                >
                </List>
            </div>
            </Col>
            </Row>

            <Row justify= 'center'>
            <Col flex = '240px'></Col>
            <Col flex = 'auto'>
            <Input  style = {{
            }}>
            </Input>
            </Col>
            <Col flex = '240px'>
            {/* add onclick function */}
            <Button onClick = {sendMessage}>
                Send
            </Button>
            </Col>
            </Row>
            <Modal 
            title = 'Room Options' 
            visible = {settingsVisible}
            onOk = {handleOk}
            onCancel = {handleCancel}
            >
                <Input defaultValue = {roomTitle} onPressEnter = {handleEditTitle}></Input>
                <Input defaultValue = {roomDescription} onPressEnter = {handleEditDescription}></Input>
            </Modal>
        </div>
    )
}

export default ChatRoom