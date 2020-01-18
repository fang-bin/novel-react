import './form.less';
import React, { useState, Fragment, } from 'react';
import { Form, Input, Icon, Button, Checkbox, Drawer, Row, Col, } from 'antd';
const { Item, } = Form;
let hasInputConfirm = false;

const RegisterForm = (props: any) => {
  const [hasRead, setHasRead] = useState<boolean>(false);
  const [statementVis, setStatementVis] = useState<boolean>(false);
  const {
    form,
    form: {
      getFieldDecorator,
      getFieldsError,
      isFieldTouched,
      getFieldsValue,
    },
  } = props;
  interface FormProps<T> {
    nickname: T;
    account: T;
    password: T;
    confirm: T;
    email: T;
    remember: boolean;
  }
  const hasError = (fieldsError: any, fieldValue: FormProps<string | undefined>) => 
    Object.keys(fieldValue).filter(item => item !== 'remember' && item !== 'read').some(key => !isFieldTouched(key)) || 
      Object.keys(fieldsError).some(field => fieldsError[field]) ||
       !hasRead;
  const validateToNextPassword = (rule: any, value: string, callback: Function) => {
    if (value && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/.test(value)) return callback('密码不符合规范');
    if(value && hasInputConfirm) {
      form.validateFields(['confirm'], {force: true});
    }
    callback();
  }
  const nicknameCheck = (rule: any, value: string, callback: Function) => {
    if (value && !/^\w{4,12}$/.test(value)) return callback('昵称不符合规范');
    callback();
  }
  const accountCheck = (rule: any, value: string, callback: Function) => {
    if (value && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/.test(value)) return callback('用户名不符合规范');
    callback();
  }
  const emailCheck = (rule: any, value: string, callback: Function) => {
    if (value && !/^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/.test(value)) return callback('邮箱不符合规范');
    callback();
  }
  const compareToFirstPassword = (rule: any, value: string, callback: Function) => {
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
    e.preventDefault();
    form.validateFields((err: any, values: Object) => {
      if (!err) {
        console.log(values);
      }
    })
  }
  const readChange = (e: any) => {
    const { checked, } = e.target;
    setHasRead(checked);
  }
  return (
    <Fragment>
      <Form className="register-form-box" onSubmit={handleSubmit}>
        <Item>
          {
            getFieldDecorator('nickname', {
              rules: [
                {
                  required: true,
                  message: '请输入昵称',
                },
                {
                  validator: nicknameCheck,
                },
              ],
            })(<Input
              prefix={<Icon type="smile" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="昵称：4-12个字符（汉字、字母、数字）"
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
                {
                  validator: accountCheck,
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
                  validator: validateToNextPassword,
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
                {
                  validator: emailCheck,
                },
              ],
            })(<Input
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="邮箱"
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
          <span className="has-read">
            <Checkbox className="has-read-checkbox" checked={hasRead} onChange={readChange}>已读并同意</Checkbox>
            <span className="statement" onClick={() => setStatementVis(true)}>免责声明</span>
          </span>
        </Item>
        <Item>
          <Button type="primary" htmlType="submit" disabled={hasError(getFieldsError(), getFieldsValue())} block>注册并登录</Button>
        </Item>
      </Form>
      <Drawer
        className="statement-box"
        height={'60%'}
        placement="bottom"
        closable={false}
        onClose={() => setStatementVis(false)}
        visible={statementVis}
      >
        <Row type="flex" justify="center">
          <Col span={6}>
            <h3>免责声明</h3>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <p>一切都与网站作者无关！！！！！！！！！！</p>
          </Col>
        </Row>
      </Drawer>
    </Fragment>
  )
}

export default Form.create()(RegisterForm);