import './index.less';
import React, { useState, useRef, } from 'react';
import CommonUser from '../../components/login-or-register';
import { Steps, Icon, Carousel, Button, Input, } from 'antd';
const { Step } = Steps;
const defaultColor = '#fff';
const activeColor = '#1890ff'
export default () => {
  const [current, setCurrent] = useState<number>(0);
  const [email, setEmail] = useState<string|undefined>(undefined);
  const [code, setCode] = useState<number|undefined>(undefined);
  const [password, setPassword] = useState<string|undefined>(undefined);
  const stepsRef = useRef(null);
  const next = () => {
    current !== 2 && setCurrent(current + 1);
    (stepsRef.current as any).next();
  }
  const prev = () => {
    setCurrent(current - 1);
    (stepsRef.current as any).prev();
  }
  return (
    <CommonUser className="forget-page">
      <Steps className="steps-box" current={current}>
        <Step className={current > 0 ? 'active' : ''} title="输入邮箱" icon={<Icon type="mail" style={{ color: current > 0 ? activeColor : defaultColor }} />} />
        <Step className={current > 1 ? 'active' : ''} title="输入验证码" icon={<Icon type="solution" style={{ color: current > 1 ? activeColor : defaultColor }} />} />
        <Step className={current > 2 ? 'active' : ''} title="新密码" icon={<Icon type="lock" style={{ color: current > 2 ? activeColor : defaultColor}} />} />
      </Steps>
      <Carousel
        className="steps-content"
        dots={false}
        effect="fade"
        ref={stepsRef}
        >
        <div className="step-content">
          <Input value={email} placeholder="请输入邮箱" onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="step-content">
          <Input value={code} placeholder="请输入验证码" onChange={e => setCode(+e.target.value)} />
        </div>
        <div className="step-content">
          <Input value={password} placeholder="请输入新密码" onChange={e => setPassword(e.target.value)} />
        </div>
      </Carousel>
      <div className="steps-control">
        {
          current === 0 && <div></div>
        }
        {
          current !== 0 &&
          <Button onClick={prev}>上一步</Button>
        }
        {
          current !== 2 &&
            <Button type="primary" onClick={next}>下一步</Button>
        }
        {
          current === 2 &&
            <Button type="primary">提交</Button>
        }
      </div>
    </CommonUser>
  )
}