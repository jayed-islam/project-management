"use client";

import React from "react";
import { Button, Form, Input, Select, Space, message } from "antd";
import useAuthStore, { IUser } from "@/zustand/auth-state";
import { useRouter } from "next/navigation";
import { validatePassword } from "@/validation/auth";
import { paths } from "@/layouts/paths";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const SigninForm: React.FC = () => {
  const [form] = Form.useForm();
  const signIn = useAuthStore((state) => state.signIn);
  const router = useRouter();

  const onFinish = (values: IUser) => {
    console.log(values);
    if (
      values.email === "abdullah@gmail.com" &&
      values.password === "Pass123$"
    ) {
      const token = "myMocktoken";
      const user = { ...values, role: "admin" };

      signIn(token, user);
      router.push(paths.root);
      message.success("Successfully Signin");
    } else {
      message.error("Invalid username or password");
    }
  };

  const onFill = () => {
    form.setFieldsValue({ email: "abdullah@gmail.com", password: "Pass123$" });
  };

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: "Email is required" },
          { type: "email", message: "Invalid email format" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[{ validator: validatePassword }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button type="link" htmlType="button" onClick={onFill}>
            Fill form
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default SigninForm;
