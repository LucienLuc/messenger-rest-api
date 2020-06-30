import React from 'react';
//import { withRouter } from "react-router-dom";
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios'

function Login() {

    const onLogin = (values) => {
        axios.post('http://127.0.0.1:8000/auth/jwt/create/', {
            username: values.username,
            password: values.password
          }).then(
            response => {
                //runs when login is successful
                console.log("Success!")
                console.log(response)
                //console.log(response); setToken(response.data.access)
            }).catch(error => console.log(error))
      }

    return (
        <div>
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