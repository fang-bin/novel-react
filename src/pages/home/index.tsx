import './index.less';
import React, { useState, } from 'react';
import { Layout, Menu, Icon, } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
const { SubMenu, } = Menu;
export default () => {
  const [collapse, setCollapse] = useState<boolean>(false);
  const onCollapse = (collapsed: boolean) => {
    setCollapse(collapsed);
  }
  return (
    <Layout className="home-page" style={{ minHeight: '100vh', }}>
      <Sider collapsible={true} collapsed={collapse} onCollapse={onCollapse}>
        <div className="logo">方斌中文网</div>
        <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
          <Menu.Item key="1">
            <Icon type="user" />
            <span>个人信息</span>
          </Menu.Item>
        </Menu>
      </Sider>
    </Layout>
  )
}