import React from 'react';
import { Form, Input, Icon, Button, } from 'antd';
const { Item, } = Form;
let hasInputConfirm = false;

const RegisterForm = (props: any) => {
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
    Object.keys(fieldValue).some(key => !isFieldTouched(key)) || 
      Object.keys(fieldsError).some(field => fieldsError[field]);
  const validateToNextPassword = (rule: any, value: String, callback: Function) => {
    if(value && hasInputConfirm) {
      form.validateFields(['confirm'], {force: true});
    }
    callback();
  }
  const compareToFirstPassword = (rule: any, value: String, callback: Function) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码输入不一致');
    }else {
      callback();
    }
  }
  const handleConfirmBlur = (e: any) => {
    const { value, } = e.target;
    hasInputConfirm = hasInputConfirm || !!value;
  }
  const handleSubmit = (e: any) => {
    console.log('aaa')
    e.preventDefault();
    form.validateFields((err: any, values: Object) => {
      if (!err) {
        console.log(values);
      }
    })
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Item>
        {
          getFieldDecorator('nickname', {
            rules: [
              {
                required: true,
                message: '请输入昵称',
              },
            ],
          })(<Input
            prefix={<Icon type="smile" style={{color: 'rgba(0,0,0,.25)'}} />}
            placeholder="昵称"
          />)
        }
      </Item>
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
              {
                validator: validateToNextPassword,
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
          getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: '请重复密码',
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          })(<Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="重复密码"
            type="password"
            onBlur={handleConfirmBlur}
          />)
        }
      </Item>
      <Item>
        {
          getFieldDecorator('email', {
            rules: [
              {
                required: true,
                message: '请输入邮箱',
              },
            ],
          })(<Input
            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="邮箱"
          />)
        }
      </Item>
      <Item>
        <Button type="primary" htmlType="submit" disabled={hasError(getFieldsError(), getFieldsValue())} block>注册并登录</Button>
      </Item>
    </Form>
  )
}

export default Form.create()(RegisterForm);