import React, {useState, useEffect} from 'react'
import axios from 'axios'

import {BellOutlined, CheckOutlined, CloseOutlined} from '@ant-design/icons';

import {Input,Button, Descriptions, Row, Col, Modal, List, message} from 'antd'

function ChatRoom(props) {
    const accessToken = localStorage.getItem('accessToken')
    const [currentUser, setUser] = useState()

    const config = {
        headers: {
          'Authorization': `JWT ${accessToken}`,
        }
    }

    const [inputValue, setInputValue] = useState('')

    //State data for room
    const [messages, setMessages] = useState([])
    const [roomRequests, setRoomRequests]= useState([])
    const [memberList, setMemberList] = useState() 

    const [requestsVisible, setRequestsVisible] = useState(false)

    const [roomTitle, setRoomName] = useState(props.location.state.data.title)
    const [roomDescription, setRoomDescription] = useState(props.location.state.data.description)

    const handleSettingsClick = () => {
        setRequestsVisible(true)
    }

    const handleOk = () => {
        setRequestsVisible(false)
    }

    const handleCancel = () => {
        setRequestsVisible(false)
    }

    const onInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const sendMessage = (e) => {
        const messageText = e.target.value
        //Get who is sending message
        axios.get('http://127.0.0.1:8000/auth/users/me/', config).then(response => {
            return response.data.username
        }).then((response) => {
        const input = {
            message: messageText,
            sender: {username: response},
            room: {title: roomTitle}
        }
        //POST message
        axios.post('http://127.0.0.1:8000/message/', input, config).then(response => {
        }).catch(error => (console.log(error))).then(() => {
            //GET new messages and scroll to bottom
            axios.get('http://127.0.0.1:8000/room/' + roomTitle + '/', config).then(response => {
            return response.data.messages
        }).catch(error => (console.log(error))).then((messages) => {
            axios.get('http://127.0.0.1:8000/message/', config).then(response => {
                const mappedMessages = messages.map(id => response.data[id-1])
                setMessages(mappedMessages)
                var elem = document.getElementById('messages')
                elem.scrollTop = elem.scrollHeight 
            })
        })
        })
        setInputValue('')
    })}

    //Periodically get new messages
    const getMessages = () => {
        axios.get('http://127.0.0.1:8000/room/' + roomTitle + '/', config).then(response => {
            return response.data.messages
        }).catch(error => (console.log(error))).then((messages) => {
            axios.get('http://127.0.0.1:8000/message/', config).then(response => {
                const mappedMessages = messages.map(id => response.data[id-1])
                setMessages(mappedMessages)
            })
        })
    }
    //Periodically get room requests
    const getRoomRequests = () => {
        const roomTitle = props.location.state.data.title
        axios.get('http://127.0.0.1:8000/room/' + roomTitle + '/', config).then(response => {
            return response.data.requests
        }).then(response => {
            setRoomRequests(response)
        })
    }

    //Periodically get member list
    const getMembers = () => {
        const roomTitle = props.location.state.data.title
        axios.get('http://127.0.0.1:8000/room/' + roomTitle + '/', config).then(response => {
            return response.data.members
        }).then(response => {
            setMemberList(response)
        })
    }

    var roomRequestsInterval = null
    var messageInterval = null
    var memberInterval = null
    useEffect(() => {
        messageInterval = setInterval(getMessages,1000)
        roomRequestsInterval = setInterval(getRoomRequests,1000)
        memberInterval = setInterval(getMembers,1000)
        return () => {
            clearInterval(messageInterval)
            clearInterval(roomRequestsInterval)
            clearInterval(memberInterval)
        }
    })

    function AcceptButton(prop) {
        const handleAcceptRequest = () => {
            const roomTitle = props.location.state.data.title
            const input = {
                username: {'username': prop.requestee_username},
                room: {'title': roomTitle}
            }
            axios.post('http://127.0.0.1:8000/room/' + roomTitle + '/AcceptUser/', input, config).then(response=> {
                message.success('Accepted ' + prop.requestee_username + '\'s request!' )
            }).catch(error => {
                console.log(error)
            })
        }

        return (
            <CheckOutlined onClick = {handleAcceptRequest} style= {{
                color: 'lime',
                margin: '2px'
            }}/>
        )
    }

    function RejectButton(prop) {
        const handleAcceptRequest = () => {
            const roomTitle = props.location.state.data.title
            const input = {
                username: {'username': prop.requestee_username},
                room: {'title': roomTitle}
            }
            axios.post('http://127.0.0.1:8000/room/' + roomTitle + '/RejectUser/', input, config).then(response=> {
                message.warning('Rejected ' + prop.requestee_username + '\'s request' )
            }).catch(error => {
                console.log(error)
            })
        }

        return (
            <CloseOutlined onClick = {handleAcceptRequest} style= {{
                color: 'red',
                margin: '2px'
            }}/>
        )
    }

    return (
        <div>
            <Row justify = 'center'>
            <Col>
            <div className = 'info' style = {{
                height: '250px',
                width: '200px',
                margin: '20px',
                border: '2px solid grey',
                borderRadius:'5px',
                padding: '4px'
            }}>
                <BellOutlined onClick = {handleSettingsClick}/>
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
            <div className = 'messagebox' id = 'messages' style = {{
                height: '300px',
                border: '2px solid grey',
                borderRadius:'5px',
                margin: '1px',
                overflow: 'auto'
            }}>
                    {messages.map((value) => {
                    return (
                        <p key={value.unique_id}>
                            {value.sender}
                            {': '}
                            {value.message}
                        </p>
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
            <Input
                value = {inputValue}
                onChange = {onInputChange}
                onPressEnter = {sendMessage}
            >
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
            title = 'Room Requests' 
            visible = {requestsVisible}
            onOk = {handleOk}
            onCancel = {handleCancel}
            footer = {[
                <Button key = 'close' danger onClick = {handleCancel}>Close</Button>
            ]}
            >
                {roomRequests.map((value) => {
                    return (
                        <div key={value}>
                            <p id= {value} style= {{
                                // float: 'left',
                                margin: '2px',
                                padding: '2px'
                            }}>
                                {value}
                            </p>
                            <AcceptButton requestee_username={value}/>
                            <RejectButton requestee_username={value}/>
                        </div>
                    )
                })}
            </Modal>
        </div>
    )
}

export default ChatRoom