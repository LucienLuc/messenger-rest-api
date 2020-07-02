import React from 'react';

import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios'

//import App from '../App';

function Login(props) {
  //  const accessToken = localStorage.getItem('accessToken')

  //   const {access, changeAccess} = useContext(UserContext)

  //   const seeAccess = () => {
  //     console.log(dummy)
  // }

  // const config = {
  //   headers: {
  //     'Content-type': 'application/json',
  //     'Authorization': `JWT ${accessToken}`,
  //   }
  // }

    const onLogin = (values) => {
        axios.post('http://127.0.0.1:8000/auth/jwt/create/', {
            username: values.username,
            password: values.password
          }).then(
            response => {
                localStorage.setItem('accessToken', response.data.access)
                localStorage.setItem('isLoggedIn', true)
                console.log("Success!")
                console.log(response)
                message.success('Successfully logged in!')
                props.history.push('/lobby')
            }).catch(error => console.log(error))
      }

    return (
        <div style = {{margin: '100px 40% 100px'}}>
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