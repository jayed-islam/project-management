"use client";

import React, { ReactNode, useState } from "react";
import { Layout, Menu, theme } from "antd";
import { navLists } from "./config-navigation";
import { UploadOutlined, VideoCameraOutlined } from "@ant-design/icons";

interface Props {
  children: ReactNode;
}

const { Header, Content, Footer, Sider } = Layout;

const AppMainLayout: React.FC<Props> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className=" mb-7 mt-3 py-2 bg-slate-700 m-2 rounded-lg text-white text-center font-semibold">
          Project Manager
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UploadOutlined />,
              label: "Projects",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: "81vh",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppMainLayout;
