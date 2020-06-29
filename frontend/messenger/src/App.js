import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Button} from '@material-ui/core'
import axios from 'axios'

const serv = '127.0.0.1:8000/'
const serv2 = 'localhost:8000/api'

function User(props) {
  const [token, setToken] = useState('')

  // const handleClick = () => {
  //   axios.get('http://127.0.0.1:8000/api/').then(response => {
  //     console.log(response);
  //     setData(response.data.results[0].title)
  //   }).catch(error => console.log(error))
  // }

  const handleRegister = () => {
    axios.post('http://127.0.0.1:8000/rest-auth/registration/', {
      username: 'dom3',
      password1: 'Dom12345678',
      password2: 'Dom12345678',
      email: 'dom3@gmail.com'
    }).then(
      response => console.log(response)).catch(error => console.log(error))
  }

  const handleLogin = () => {
    axios.post('http://127.0.0.1:8000/rest-auth/login/', {
      username: 'dom3',
      email: 'dom3@gmail.com',
      password: 'Dom12345678'
    }).then(
      response => {console.log(response); setToken(response.data.key)}).catch(error => console.log(error))
  }
  // setTokenz()

  const setTokenz = () => {
    axios.post('http://127.0.0.1:8000/api-token-auth/', {
      username: 'dom3',
      password: 'Dom12345678'
    }).then(
      response => { return console.log(response);}).catch(error => console.log(error))
  }

  // setToken(response.data.token)

  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }

  const handleLogout = () => {
    axios.post('http://127.0.0.1:8000/rest-auth/logout/', {}).then(
      response => console.log(response)).catch(error => console.log(error))
  }

  // const handleVerifyToken = () => {
  //   axios.post('http://127.0.0.1:8000/api-token-verify/', {
  //     'token': token
  //   }).then(
  //     response => console.log(response)).catch(error => console.log(error))
  // }

  const handleGetUser = () => {
    console.log(config.headers.Authorization)
    axios.get('http://127.0.0.1:8000/rest-auth/user/', {
      username: 'dom3',
      first_name: '',
      last_name: ''
    }, config).then(
      response => console.log(response)).catch(error => console.log(error))
  }

  const tester = () => {
    axios.post('http://127.0.0.1:8000/rest-auth/password/change/', {
      new_password1: 'Dom12345678',
      new_password2: 'Dom12345678',
      old_password: 'Dom12345678'
    })
  }

  return (
    <div>
      <Button onClick={handleRegister}>
      Register Jimmy
      </Button>
      <Button onClick={handleLogin}>
      Log in Jimmy
      </Button>
      <Button onClick={handleLogout}>
        Log out Jimmy
      </Button>
      <Button onClick={handleGetUser}>
        Get Jimmy
      </Button>
      {/* <Button onClick={handleVerifyToken}>
        verify
      </Button> */}
      <Button onClick={tester}>
        tester
      </Button>
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
