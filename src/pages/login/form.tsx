import './form.less';
import React from 'react';
import { Form, Input, Icon, Checkbox, Button, } from 'antd';
const { Item, } = Form;

const LoginForm = (props: any) => {
  const {
    form,
    form: {
      getFieldDecorator,
      getFieldsError,
      isFieldTouched,
      getFieldsValue,
    },
  } = props;
  const hasError = (fieldsError: any, fieldValue: any) => 
    Object.keys(fieldValue)
      .filter(key => key !== 'remember')
        .some(key => !isFieldTouched(key)) || 
          Object.keys(fieldsError)
            .some(field => fieldsError[field]);
  return (
    <Form>
      <Item>
        {
          getFieldDecorator('account', {
            rules: [
              {
                required: true,
                message: '请输入用户名',
              },
            ],
          })(<Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="用户名"
          />)
        }
      </Item>
      <Item>
        {
          getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请输入密码',
              },
            ],
          })(<Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="密码"
            type="password"
          />)
        }
      </Item>
      <Item>
        {
          getFieldDecorator('remember', {
            initialValue: true,
            valuePropName: 'checked',
          })(<Checkbox className="remember-me">Remember me</Checkbox>)
        }
        <a className="forgot-password" href="/">忘记密码</a>
      </Item>
      <Item>
        <Button type="primary" htmlType="submit" disabled={hasError(getFieldsError(), getFieldsValue())} className="login-form-button" block>登录</Button>
      </Item>
      <Item>
        <Button type="default" href="#/register" block>注册</Button>
      </Item>
    </Form>
  )
}

export default Form.create()(LoginForm);