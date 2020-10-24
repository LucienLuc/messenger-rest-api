import React from 'react';
import './App.css';

import {Route, Switch} from 'react-router-dom'
import { withRouter } from 'react-router-dom';

import Navbar from './views/Navbar'
import Login from './views/Login'
import Register from './views/Register'
import ChatLobby from './views/ChatLobby'
import ChatRoom from './views/ChatRoom'

function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar/>
      </header>
      <Switch>
        <Route exact path = "/" component = {Login}/>
        <Route exact path = "/login" component = {Login} />
        <Route exact path = "/register" component = {Register} />
        <Route exact path = "/lobby" component = {ChatLobby} />
        <Route exact path = "/chatroom" component = {ChatRoom} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
