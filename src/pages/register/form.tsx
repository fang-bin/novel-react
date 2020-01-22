import './form.less';
import React, { useState, Fragment, useEffect, } from 'react';
import fetch from '../../fetch';
import { Form, Input, Icon, Button, Checkbox, Drawer, Row, Col, message, } from 'antd';
const { Item, } = Form;
let hasInputConfirm = false;
enum validateStatus {
  Validating = 'validating',
  Success = 'success',
  Error = 'error',
}
interface StatuType {
  blur: boolean;
  status: validateStatus,
}
interface StatusType {
  nick_name: StatuType;
  account: StatuType;
  email: StatuType;
}
const RegisterForm = (props: any) => {
  const [hasRead, setHasRead] = useState<boolean>(false);
  const [statementVis, setStatementVis] = useState<boolean>(false);
  const [status, setStatus] = useState<StatusType>({
    nick_name: {
      blur: false,
      status: validateStatus.Success,
    }, 
    account: {
      blur: false,
      status: validateStatus.Success,
    }, 
    email: {
      blur: false,
      status: validateStatus.Success,
    },
  });
  const [statusAllSuccess, setStatusAllSuccess] = useState<boolean>(false);
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

  // 校验错误
  const hasError = (fieldsError: any, fieldValue: FormProps<string | undefined>): boolean => 
    Object.keys(fieldValue).filter(item => item !== 'remember' && item !== 'read').some(key => !isFieldTouched(key)) || 
      Object.keys(fieldsError).some(field => fieldsError[field]) ||
       !hasRead;

  // 校验第一个密码框（同时会对比第一个和第二个密码框是否输入一致）
  const validateToNextPassword = (rule: any, value: string, callback: Function) => {
    if (value && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/.test(value)) return callback('密码不符合规范');
    if(value && hasInputConfirm) {
      form.validateFields(['confirm'], {force: true});
    }
    callback();
  }

  // 昵称校验
  const nicknameCheck = (rule: any, value: string, callback: Function) => {
    if (value && !/^[\u4e00-\u9fa5|\w{4,12}]/.test(value)) return callback('昵称不符合规范');
    callback();
  }

  // 账号校验
  const accountCheck = (rule: any, value: string, callback: Function) => {
    if (value && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/.test(value)) return callback('用户名不符合规范');
    callback();
  }

  // 邮箱校验
  const emailCheck = (rule: any, value: string, callback: Function) => {
    if (value && !/^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/.test(value)) return callback('邮箱不符合规范');
    callback();
  }

  // 第二个密码框校验（比较两次密码输入是否一致）
  const compareToFirstPassword = (rule: any, value: string, callback: Function) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码输入不一致');
    }else {
      callback();
    }
  }

  // 触发过第二次密码框的输入（只有第二次密码框输入过，才会去比较两次密码输入是否一致）
  const handleConfirmBlur = (e: any) => {
    const { value, } = e.target;
    hasInputConfirm = hasInputConfirm || !!value;
  }

  // 提交
  const handleSubmit = (e: any) => {
    e.preventDefault();
    form.validateFields((err: any, values: Object) => {
      if (err) {
        console.log(values);
        return;
      }
      fetch({
        url: '/api/user/sign',
        body: values,
        method: 'post',
      })
        .then(res => {
          const { data, } = res;
          if (data === true) {
            message.error('恭喜您！注册成功~');
          }
          setTimeout(() => {
            window.location.href = '/';
          }, 1000);
        })
        .catch(err => {
          const { status, name, } = err;
          if (status === 400) {
            message.error('注册的信息错误，请您检查后重新填写~');
          }else {
            message.error('服务器开小差了，请稍后重试~');
          }
        });
    })
  }

  // 切换是否选中已经阅读
  const readChange = (e: any) => {
    const { checked, } = e.target;
    setHasRead(checked);
  }

  // 验证：昵称，账号，邮箱是否有重复（输入框blur开始验证）
  const tipsConst = { nick_name: '昵称', account: '账号', email: '邮箱', };
  type validateRepeatTypes = 'nick_name' | 'account' | 'email';
  const validateRepeat = (type: validateRepeatTypes, e: any) => {
    const { value, } = e.target;
    const params = {
      [type]: value,
    };
    fetch({
      url: '/api/user/validate',
      body: params,
      method: 'post',
    })
      .then(res => {
        const { data, } = res;
        let temStatus: validateStatus = validateStatus.Success;
        if (!data) {
          message.warning(`${tipsConst[type]}已经给被被注册~`);
          temStatus = validateStatus.Error;
        }
        setStatus({
          ...status,
          [type]: {
            blur: true,
            status: temStatus,
          },
        });
        
      })
      .catch(err => {
        message.error('服务器开小差了，请稍后重试~');
      });
  }
  useEffect(() => {
    let allSuccess: boolean = Object.keys(status).every(key => (status as any)[key].status === validateStatus.Success);
    allSuccess !== statusAllSuccess && setStatusAllSuccess(allSuccess);
  }, [status]);
  return (
    <Fragment>
      <Form className="register-form-box" onSubmit={handleSubmit}>
        <Item hasFeedback={status.nick_name.blur} validateStatus={status.nick_name.status}>
          {
            getFieldDecorator('nick_name', {
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
              onBlur={validateRepeat.bind(null, 'nick_name')}
            />)
          }
        </Item>
        <Item hasFeedback={status.account.blur} validateStatus={status.account.status}>
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
              onBlur={validateRepeat.bind(null, 'account')}
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
            })(<Input.Password
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="密码：8-16位，至少包含一个数字和字母"
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
            })(<Input.Password
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="重复密码"
              onBlur={handleConfirmBlur}
            />)
          }
        </Item>
        <Item hasFeedback={status.email.blur} validateStatus={status.email.status}>
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
              onBlur={validateRepeat.bind(null, 'email')}
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
          <Button type="primary" htmlType="submit" disabled={hasError(getFieldsError(), getFieldsValue()) || !statusAllSuccess} block>注册并登录</Button>
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