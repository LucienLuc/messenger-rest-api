import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Button} from '@material-ui/core'
import axios from 'axios'

const serv = '127.0.0.1:8000/'
const serv2 = 'localhost:8000/api'

function Data(props) {
  const [data, setData] = useState('')

  const handleClick = () => {
    // axios.defaults.withCredentials = true;
    // axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';
    axios.get('http://127.0.0.1:8000/api/').then(response => {
      console.log(response);
      setData(response.data.results[0].title)
    }).catch(error => console.log(error))
  }

  return (
    <div>
      <Button onClick={handleClick}>
      Click Me
      </Button>
      <p>
        {data}
      </p>
    </div>
  )
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <Data></Data>
        </p>
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
