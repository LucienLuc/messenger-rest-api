import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Button} from '@material-ui/core'
import axios from 'axios'

const serv = '127.0.0.1:8000/'
const serv2 = 'localhost:8000/api'

function User(props) {
  const [token, setToken] = useState('')
  const [messages, setMessages] = useState([])

  // const handleClick = () => {
  //   axios.get('http://127.0.0.1:8000/api/').then(response => {
  //     console.log(response);
  //     setData(response.data.results[0].title)
  //   }).catch(error => console.log(error))
  // }

  const handleRegister = () => {
    axios.post('http://127.0.0.1:8000/auth/users/', {
      username: 'dom',
      password: 'Dom12345678',
      email: 'dom@gmail.com'
    }).then(
      response => console.log(response)).catch(error => console.log(error))
  }

  const handleLogin = () => {
    axios.post('http://127.0.0.1:8000/auth/jwt/create/', {
      username: 'dom',
      password: 'Dom12345678'
    }).then(
      response => {console.log(response); setToken(response.data.access)}).catch(error => console.log(error))
  }

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
chatSocket.send(JSON.stringify({
  'message': 'allah'
}));
}

  return (
    <div>
      <Button onClick={handleRegister}>
      Register Jimmy
      </Button>
      <Button onClick={handleLogin}>
      Log in Jimmy
      </Button>
      <Button onClick={handleGetUser}>
        Get Jimmy
      </Button>
      <Button onClick={sendMessage}>
        Send Message
      </Button>
      {messages.map((value, index) => {
        return (
          <p>{value}</p>
        )
      })}
    </div>
  )
}

function Channel(props) {
  return (
    <div>
      <p>channels</p>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <User></User>
          <Channel></Channel>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
