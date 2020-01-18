import './form.less';
import React from 'react';
import { Form, Input, Icon, Checkbox, Button, } from 'antd';
const { Item, } = Form;

const LoginForm = (props: any) => {
  const {
    // form,
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
  const accountOrPasswordCheck = (txt: string) =>((rule: any, value: string, callback: Function) => {
    if (value && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/.test(value)) return callback(`${txt}不符合规范`);
    callback();
  });
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
              {
                validator: accountOrPasswordCheck('用户名'),
              },
            ],
          })(<Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="用户名：8-16位，至少包含一个数字和字母"
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
              {
                validator: accountOrPasswordCheck('密码'),
              },
            ],
          })(<Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="密码：8-16位，至少包含一个数字和字母"
            type="password"
          />)
        }
      </Item>
      <Item>
        {
          getFieldDecorator('remember', {
            initialValue: true,
            valuePropName: 'checked',
          })(<Checkbox className="remember-me">记住密码</Checkbox>)
        }
        <a className="forgot-password" href="#/forget">忘记密码</a>
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