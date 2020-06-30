import React, {useState} from 'react'
import {List,Button,Drawer, Form, Input, message} from 'antd'

function ChatLobby() {

    const [createLobbyVisible, setState] = useState(false)

    const showCreateLobby = () => {
        setState(true)
    }

    const onClose = () => {
        setState(false)
    }
    
    const onCreateRoom = (values) => {
        console.log(values)
    }
    const data = [
        {
            title: 'Lobby 1',
            description: 'description 1'
        },
        {
            title: 'Lobby 2',
            description: 'description 2'
        },
        {
            title: 'Lobby 3', 
            description: 'description 3'
        }

    ]

    return (
        <div>
            <Button onClick = {showCreateLobby}>
                Create Room
            </Button>
            <List
                itemLayout = 'horizontal'
                dataSource = {data}
                renderItem = {(item) => (
                    <List.Item>
                        <List.Item.Meta
                            title = {<a>{item.title}</a>}
                            description = {item.description}
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
                    <Form.Item
                        name = 'password'
                        label = 'Password (optional)'
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