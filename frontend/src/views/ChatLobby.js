import React, {useState, useEffect} from 'react'
import axios from 'axios'

import {List,Button,Drawer, Form, Input, message} from 'antd'

function ChatLobby() {
    const accessToken = localStorage.getItem('accessToken')
    const config = {
        headers: {
            'Authorization': `JWT ${accessToken}`
        }
    }
    const [createLobbyVisible, setState] = useState(false)
    const [availableRooms, setRoomData] = useState()

    const showCreateLobby = () => {
        setState(true)
    }

    const onClose = () => {
        setState(false)
    }

    const getRoomData = () => {
        axios.get('http://127.0.0.1:8000/chat/getRooms/').then(response => {
            setRoomData(response.data)
        }).catch(error => console.log(error))
    }

    //change to also include description and pass
    const onCreateRoom = (values) => {
        const input = {
            title: values.roomname,
            description: values.description
        }
        axios.post('http://127.0.0.1:8000/chat/createRooms/',input, config).then(response => {
            console.log(response);
            message.success('Successfully created room');
        }).catch(error => console.log(error))

        //close drawer
        onClose();

        //refresh room list
        axios.get('http://127.0.0.1:8000/chat/getRooms/').then(response => {
            console.log('here')
            var res = response.data.map(elm => {
                return {title: elm.name}
            })
            setRoomData(res)
        }).catch(error => console.log(error))
    }

    useEffect(() => {
        //Figure out why cannot just call function getRoomData function
        axios.get('http://127.0.0.1:8000/chat/getRooms/').then(response => {
            setRoomData(response.data)
        }).catch(error => console.log(error))
    },[])

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
                renderItem = {(item) => (
                    <List.Item
                    actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
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
                        label = 'Description (optional)'
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