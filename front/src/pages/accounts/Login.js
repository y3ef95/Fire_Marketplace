import React from "react";
import { Card, Form, Input, Button, notification } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppContext, setToken } from "store";
import { axiosInstance } from "api";
import "scss/Login.scss";

export default function Login() {
  const navigate = useNavigate();
  const { dispatch } = useAppContext();
  const location = useLocation();
  const { from: loginRequiredUrl } = location.state || {
    from: { pathname: "/" },
  };

  const onFinish = (values) => {
    async function fn() {
      const { email, password } = values;

      const data = { email, password };
      try {
        const reponse = await axiosInstance.post("/accounts/token/", data);

        const {
          data: { token: jwtToken },
        } = reponse;
        dispatch(setToken(jwtToken));

        notification.open({
          message: "로그인 성공",
          description: "메인 페이지로 이동합니다.",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });
        navigate(loginRequiredUrl);
      } catch (error) {
        if (error) {
          notification.open({
            message: "로그인 실패",
            description: "아이디 / 비밀번호를 확인해주세요.",
            icon: <FrownOutlined style={{ color: "#ff3333" }} />,
          });
        }
      }
    }
    fn();
  };

  return (
    <div className="login_field">
      <Card title="로그인">
        <Form onFinish={onFinish} autoComplete={"false"}>
          <Form.Item
            label="이메일"
            name="email"
            rules={[
              { required: true, message: "이메일을 입력해주세요!" },
              { type: "email", message: "이메일 형식에 맞게 입력해주세요!" },
            ]}
            hasFeedback
          >
            <Input style={{ width: "225px", float: "right" }} />
          </Form.Item>
          <Form.Item
            label="비밀번호"
            name="password"
            rules={[{ required: true, message: "비밀번호를 입력해주세요!" }]}
          >
            <Input.Password style={{ width: "225px", float: "right" }} />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" style={{ marginLeft: "120px" }}>
              로그인
            </Button>
          </Form.Item>
          <Form.Item>
            <a
              href="/accounts/signup"
              style={{ marginLeft: "130px", textDecoration: "underline" }}
            >
              회원가입
            </a>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
