import React from 'react'
import { withRouter } from 'react-router-dom';
import {Menu,Button} from 'antd'

function Navbar(props) {
    const accessToken = localStorage.getItem('accessToken')

    //for debug purposes
    const getToken = () => {
        console.log(accessToken)
    }

   const isLoggedIn = () => {
        console.log(accessToken)
        if (accessToken === '') return false
        return true
    }

    const logout = () => {
        localStorage.setItem('accessToken', '')
        props.history.push('/')
    }

    function ConditionalLoggedIn(props){
        const isLoggedIn = props.isLoggedIn
        if (isLoggedIn) {
            return (
                <div style = {{
                position: 'fixed', 
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
    
    return (
        <div>
            {/* <Button onClick = {getToken}> get Token </Button> */}
            <Menu mode = 'horizontal'>
                <Menu.Item key = 'homepage'> 
                    Home
                </Menu.Item>
                <Menu.Item key = 'lobbies'>
                    View Lobbies
                </Menu.Item>
                <ConditionalLoggedIn isLoggedIn = {isLoggedIn()}> </ConditionalLoggedIn>
            </Menu>
         </div>
    )
}

export default withRouter(Navbar)