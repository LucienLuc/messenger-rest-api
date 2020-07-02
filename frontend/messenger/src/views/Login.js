import React, {useContext} from 'react';

import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios'

import UserContext from '../context'
//import App from '../App';

function Login() {
    const {access, changeAccess} = useContext(UserContext)

    const seeAccess = () => {
      console.log(access)
  }

  const config = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'HEAD, GET, POST, PUT, PATCH, DELETE', 
      'Content-type': 'application/json',
      'Authorization': `JWT ${access}`,
    }
  }

  const changePassword = () => {
    console.log(config.headers.Authorization)
    axios.get('http://127.0.0.1:8000/auth/users/me', config).then(response => {
        console.log(response)
    }).catch(error => console.log(error))
  }

    const onLogin = (values) => {
        axios.post('http://127.0.0.1:8000/auth/jwt/create/', {
            username: values.username,
            password: values.password
          }).then(
            response => {
                //runs when login is successful
                changeAccess(response.data.access)
                console.log("Success!")
                console.log(response)
            }).catch(error => console.log(error))
      }

    return (
        <div style = {{margin: '100px 40% 100px'}}>
          <Button onClick = {seeAccess}> See Access</Button>
          <Button onClick = {changePassword}> change pass </Button>
        <h1>Login to Messenger</h1>
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onLogin}
        >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="register">register now!</a>
      </Form.Item>
    </Form>
    </div>
    )
}

export default Login