import './form.less';
import React from 'react';
import { Form, Input, Icon, Checkbox, Button, } from 'antd';
const { Item, } = Form;

export default () => {
  
  return (
    <Form>
      <Item>
        <Input
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="用户名"
        />
      </Item>
      <Item>
        <Input
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="密码"
          type="password"
        />
      </Item>
      <Item>
        <Checkbox className="remember-me">Remember me</Checkbox>
        <a className="forgot-password" href="">忘记密码</a>
      </Item>
      <Item>
        <Button type="primary" htmlType="submit" className="login-form-button" block>登录</Button>
      </Item>
      <Item>
        <Button type="default" href="#/register" block>注册</Button>
      </Item>
    </Form>
  )
}