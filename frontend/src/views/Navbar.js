import React from 'react'
import { withRouter } from 'react-router-dom';
import {Menu,Button,message} from 'antd'

function Navbar(props) {
    const accessToken = sessionStorage.getItem('accessToken')

   const isLoggedIn = () => {
        if (accessToken === null) return false
        return true
    }

    const logout = () => {
        sessionStorage.clear()
        // sessionStorage.setItem('accessToken', '')
        props.history.push('/')
    }

    const ConditionalLoggedIn = (props) => {
        const isLoggedIn = props.isLoggedIn
        if (isLoggedIn) {
            return (
                <div style = {{
                position: 'absolute', 
                right: '25px',
                top: '3px'
                }}>
                <Button onClick = {logout} >Logout</Button>
            </div>
            )
        }
        else 
        return (
            <div style = {{
                position: 'fixed', 
                right: '25px',
                top: '3px'
                }}>
                <a href = './login'>Login</a>
                <a href = './register'> Register</a>
            </div>
        )
    }
    
    const handleLobbySelect = () => {
        var loggedIn = false
        if (accessToken === '') {
            loggedIn = false
        }
        else {
            loggedIn = true
        }
        if (loggedIn) {
            props.history.push('/lobby')
        }
        else {
            message.error('You must be logged in to view that page!')
            props.history.push('/login')
        }
    }

    return (
        <div>
            <Menu mode = 'horizontal'>
                <Menu.Item key = 'homepage'> 
                    Home
                </Menu.Item>
                <Menu.Item key = 'lobbies' onClick = {handleLobbySelect}>
                    View Lobbies
                </Menu.Item>
                <ConditionalLoggedIn isLoggedIn = {isLoggedIn()}> </ConditionalLoggedIn>
            </Menu>
         </div>
    )
}

export default withRouter(Navbar)