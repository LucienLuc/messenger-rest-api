import React, {useState} from 'react';
import './App.css';
//import {Button} from '@material-ui/core'
import {Route, Switch} from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import axios from 'axios'
import {Button} from 'antd';

import Landing from './views/Landing'
import Login from './views/Login'
import Register from './views/Register'
import ChatLobby from './views/ChatLobby'

//const serv = '127.0.0.1:8000/'
//const serv2 = 'localhost:8000/api'

function User(props) {
  const [token, setToken] = useState('')

  // const handleClick = () => {
  //   axios.get('http://127.0.0.1:8000/api/').then(response => {
  //     console.log(response);
  //     setData(response.data.results[0].title)
  //   }).catch(error => console.log(error))
  // }

  // setToken(response.data.token)

  let config = {
    headers: {
      "Authorization": `JWT ${token}`,
      'Content-Type': 'application/json',
      "Accept": "application/json"
    }
  }

  const handleGetUser = () => {
    console.log(config.headers.Authorization)
    axios.get('http://127.0.0.1:8000/auth/users/me/', config).then(
      response => console.log(response)).catch(error => console.log(error))
  }

/*
  const chatSocket = new WebSocket(
    'ws://'
    + window.location.host
    + '/ws/chat/'
    + roomName
    + '/'
);


chatSocket.onmessage = function(e) {
  const data = JSON.parse(e.data);
  document.querySelector('#chat-log').value += (data.message + '\n');
};

chatSocket.onclose = function(e) {
  console.error('Chat socket closed unexpectedly');
};

chatSocket.send(JSON.stringify({
  'message': message
}));
*/

  return (
    <p>
      hello
    </p>
  )
}

function App(props) {

  return (
    <div className="App">
      <header className="App-header">
        <Landing/>
      </header>
      <Switch>
        
        <Route exact path = "/login" component = {Login} />
        <Route exact path = "/register" component = {Register} />
        <Route exact path = "/lobby" component = {ChatLobby} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
