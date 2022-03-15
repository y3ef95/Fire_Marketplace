import React, { useState, useCallback } from "react";
import { Form, Input, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import "scss/Signup.scss";

export default function Signup() {
  const navigate = useNavigate();
  const [fieldErrors, setFieldErrors] = useState({});

  //닉네임 유효성 검사(https://e2e2e2.tistory.com/21참고)
  const validateUsername = useCallback((_, value) => {
    if (!value) {
      return Promise.reject(new Error("사용자 이름을 입력해주세요!"));
    }
    if (/\s/.test(value)) {
      return Promise.reject(
        new Error("사용자 이름에는 공백을 포함 할 수 없습니다!")
      );
    }
    let nicknameLength = 0;
    for (let i = 0; i < value.length; i += 1) {
      const char = value.charAt(i);
      if (escape(char).length > 4) {
        nicknameLength += 2;
      } else {
        nicknameLength += 1;
      }
    }
    if (nicknameLength < 2 || nicknameLength >= 20) {
      return Promise.reject(
        new Error("한글1~10자, 영문 및 숫자 2~20자까지 입력가능합니다!")
      );
    }
    const regExp = /[^a-zA-Z0-9가-힣_]/;
    if (regExp.test(value)) {
      return Promise.reject(
        new Error("한글, 영문, 숫자, _ 만 사용할 수 있습니다!")
      );
    }
    return Promise.resolve();
  }, []);
  //비밀번호 유효성 검사(https://e2e2e2.tistory.com/21참고)
  const validatePassword = useCallback((_, value) => {
    const regExp =
      /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-z]{1,50})(?=.*[A-Z]{1,50}).{8,50}$/;
    if (!value) {
      return Promise.reject(new Error("비밀번호를 입력해주세요!"));
    }
    if (!regExp.test(value)) {
      return Promise.reject(
        new Error(
          "비밀번호는 8~50자이며 영문 소문자, 영문 대문자, 숫자, 특수문자를 모두 포함해야 합니다!"
        )
      );
    }
    return Promise.resolve();
  }, []);

  const onFinish = (values) => {
    async function fn() {
      const { email, password, confirm_password, username } = values;

      setFieldErrors({});

      const data = { email, password, confirm_password, username };
      try {
        await axios.post("http://127.0.0.1:8000/accounts/signup/", data);

        notification.open({
          message: "회원가입 성공",
          description: "로그인 페이지로 이동합니다.",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });
        navigate("/login");
      } catch (error) {
        if (error.response) {
          console.error(error.response);
          notification.open({
            message: "회원가입 실패",
            description: "회원가입 정보를 확인해주세요.",
            icon: <FrownOutlined style={{ color: "#ff3333" }} />,
          });
          const { data: fieldsErrorMessages } = error.response;
          setFieldErrors(
            Object.entries(fieldsErrorMessages).reduce(
              (acc, [fieldName, errors]) => {
                acc[fieldName] = {
                  validateStatus: "error",
                  help: errors.join(" "),
                };
                return acc;
              },
              {}
            )
          );
        }
      }
    }
    fn();
  };

  return (
    <div className="signup_field">
      <p style={{ marginLeft: "160px" }}>회원가입</p>
      <Form onFinish={onFinish} autoComplete={"false"}>
        <Form.Item
          label="이메일"
          name="email"
          rules={[
            { required: true, message: "이메일을 입력해주세요!" },
            { type: "email", message: "이메일 형식에 맞게 입력해주세요!" },
          ]}
          hasFeedback
          {...fieldErrors.email}
        >
          <Input style={{ width: "240px", float: "right" }} />
        </Form.Item>
        <Form.Item
          label="사용자 이름"
          name="username"
          rules={[{ validator: validateUsername }]}
          hasFeedback
          {...fieldErrors.nickname}
        >
          <Input style={{ width: "240px", float: "right" }} />
        </Form.Item>
        <Form.Item
          label="비밀번호"
          name="password"
          rules={[{ validator: validatePassword }]}
          {...fieldErrors.non_field_errors}
        >
          <Input.Password style={{ width: "240px", float: "right" }} />
        </Form.Item>
        <Form.Item
          label="비밀번호 확인"
          name="confirm_password"
          dependencies={["password"]}
          rules={[{ required: true, message: "비밀번호를 재입력 해주세요!!" }]}
          {...fieldErrors.non_field_errors}
        >
          <Input.Password style={{ width: "240px", float: "right" }} />
        </Form.Item>

        <Form.Item>
          <Button style={{ marginLeft: "150px" }} htmlType="submit">
            회원가입
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
