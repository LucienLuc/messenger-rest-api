import React, {useState, useEffect} from 'react'
import axios from 'axios'

import {List, Button, Drawer, Form, Input, message} from 'antd'

function ChatLobby(props) {
    const accessToken = sessionStorage.getItem('accessToken')

    const config = {
        headers: {
            'Authorization': `JWT ${accessToken}`
        }
    }

    const [createLobbyVisible, setState] = useState(false)
    const [availableRooms, setRoomData] = useState()
    const [currentUser, setUser] = useState()

    const showCreateLobby = () => {
        setState(true)
    }

    const onClose = () => {
        setState(false)
    }

    //Assumes a lobby named Lobby1 has been created in the backend
    const getRoomData = () => {
        axios.get('http://127.0.0.1:8000/lobby/Lobby1/', config).then(response => {
            // console.log(response.data.room_lobby)
            setRoomData(response.data.room_lobby)
        }).catch(error => console.log(error))

        //Saves logged in user
        axios.get('http://127.0.0.1:8000/auth/users/me/', config).then(response => {
            //console.log(response)
            setUser(response.data.username)
        }).catch(error => console.log(error))
    }

    var roomInterval = null
    useEffect(() => {
        roomInterval = setInterval(getRoomData,1000)
        return () => {
            clearInterval(roomInterval)
        }
    })

    //change to also include more fields
    const onCreateRoom = (values) => {
        const input = {
            title: values.roomname,
            description: values.description,
            creator: {'username': currentUser}, 
            admins: [],
            onlineUsers: [],
            requests: [],
            lobby: {title: 'Lobby1', description: 'test'}
        }

        axios.post('http://127.0.0.1:8000/room/', input, config).then(response => {
            //console.log(response);
            message.success('Successfully created room');
        }).catch(error => console.log(error)).then(() => {
            //refresh room list
            axios.get('http://127.0.0.1:8000/lobby/Lobby1/', config).then(response => {
            //console.log(response.data.room_lobby)
            setRoomData(response.data.room_lobby)
        }).catch(error => console.log(error))
        })

        //close drawer
        onClose();
    }

    const isMember = (roomData) => {
        const roomMembersList = roomData.members
        // console.log(roomMembersList)
        // console.log(currentUser)
        if (roomMembersList.includes(currentUser)) {
            return true
        }
        else {
            return false;
        }
    }

    const handleJoinRoom = (roomData) => {
        props.history.push({
            pathname: '/chatroom',
            state: {
                data: roomData
            }
        })
    }

    const handleJoinRequest = (roomData) => {
        console.log(roomData)
        const input = {
            username: {'username': currentUser},
            room: {'title': roomData.title}
        }
        axios.post('http://127.0.0.1:8000/room/' + roomData.title + '/UserRequest/', input, config).then(response => {
            message.success('Reuested to join ' + roomData.title + '!')
        }).catch(error => {
            if (error.response.status === 409) {
                message.error('Already requested to join that room!')
            }
            else {
                console.log(error)
            }
        })
    }

    function JoinButton(prop) {
        const roomData = prop.roomData
        const isMember = prop.isMember
        if (isMember) {
            return (
                <Button onClick = {() => handleJoinRoom(roomData)}>
                    Join
                </Button>
            )
         }
        else {
            return (
                <Button onClick = {() => handleJoinRequest(roomData)}>
                    Request to Join
                </Button>
            )
        }
    }

    return (
        <div>
            <h1 style = {{textAlign: 'center'}}>Available Rooms</h1>
            <div style= {{textAlign: 'center'}}>
            <Button onClick = {showCreateLobby}>
                Create Room
            </Button>
            <Button onClick = {getRoomData}>
                Refresh
            </Button>
            </div>
            <List
                style = {{
                    margin: '10px 10% 50px 10%', 
                    padding: '10px', 
                    border: '2px solid grey',
                    borderRadius:'5px'
                }}
                itemLayout = 'horizontal'
                dataSource = {availableRooms}
                renderItem = {item => (
                    <List.Item
                    actions={[
                        <JoinButton isMember={isMember(item)} roomData={item}/>, 
                        <p>Owner: {item.creator}</p>, 
                        <p>{item.onlineUsers.length}/{item.members.length}</p>]}
                    >
                        <List.Item.Meta
                            title = {<p>{item.title}</p>}
                            description = {<p>{item.description}</p>}
                        />
                    </List.Item>
                )}
            >

            </List>

            <Drawer
                title = 'Create a chat room'
                width = {720}
                onClose = {onClose}
                visible = {createLobbyVisible}
                destroyOnClose = {true}
            >
                <Form
                onFinish = {onCreateRoom}
                >
                    <Form.Item
                        name = 'roomname'
                        label = 'Room Name'
                        rules = {[{
                            required: true,
                            message: 'A roomname is required'
                        }]}
                    >
                        <Input></Input>
                    </Form.Item>
                    <Form.Item
                        name = 'description'
                        label = 'Description'
                        rules = {[{
                            required: true,
                            message: 'A description is required'
                        }]}
                    >
                    <Input></Input>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            htmlType = 'submit'
                        >
                        Create
                        </Button>
                    </Form.Item>
                </Form>

            </Drawer>
        </div>
    )
}
export default ChatLobby