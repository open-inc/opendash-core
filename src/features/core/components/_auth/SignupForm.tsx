import * as React from "react";
import { Form, Icon as LegacyIcon } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import { Input, Button } from "antd";

import { useTranslation } from "../../../..";

const SignupForm = ({ form, onSubmit }) => {
  const [t] = useTranslation(["opendash"]);
  const handleSubmit = (e) => {
    e.preventDefault();

    form.validateFields((err, values) => {
      if (!err) {
        onSubmit(values);
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item>
        {form.getFieldDecorator("name", {
          rules: [
            {
              required: true,
              message: t("auth.fields.name_required"),
            },
          ],
        })(
          <Input
            prefix={
              <LegacyIcon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
            }
            placeholder={t("auth.fields.name")}
          />
        )}
      </Form.Item>
      <Form.Item>
        {form.getFieldDecorator("username", {
          rules: [
            {
              required: true,
              message: t("auth.fields.username_required"),
            },
          ],
        })(
          <Input
            prefix={
              <LegacyIcon type="tag" style={{ color: "rgba(0,0,0,.25)" }} />
            }
            placeholder={t("auth.fields.username")}
          />
        )}
      </Form.Item>
      <Form.Item>
        {form.getFieldDecorator("email", {
          rules: [
            {
              required: true,
              message: t("auth.fields.email_required"),
            },
          ],
        })(
          <Input
            prefix={
              <LegacyIcon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
            }
            placeholder={t("auth.fields.email")}
          />
        )}
      </Form.Item>
      <Form.Item>
        {form.getFieldDecorator("password", {
          rules: [
            {
              required: true,
              message: t("auth.fields.password_required"),
            },
          ],
        })(
          <Input
            prefix={
              <LegacyIcon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
            }
            type="password"
            placeholder={t("auth.fields.password")}
          />
        )}
      </Form.Item>
      <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
        {t("auth.fields.signup_submit")}
      </Button>
    </Form>
  );
};

export default Form.create({ name: "signup" })(SignupForm);
