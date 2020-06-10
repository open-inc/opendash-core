import * as React from "react";

import { Icon } from "@opendash/icons";

import { FormGenerator, useTranslation } from "../../../..";

export default ({ onSubmit }) => {
  const [t] = useTranslation(["opendash"]);

  return (
    <FormGenerator
      onSubmit={(data) => {
        onSubmit(data);
      }}
      submit={{
        children: t("auth.fields.signup_submit"),
        type: "primary",
        htmlType: "submit",
        style: {
          width: "100%",
        },
      }}
      settings={{
        hideLabels: true,
      }}
      elements={[
        {
          key: "name",
          type: "input",
          label: t("auth.fields.name"),
          settings: {
            placeholder: t("auth.fields.name"),
            prefixIcon: "fa:user",
          },
          rules: [
            {
              required: true,
              message: t("auth.fields.name_required"),
            },
          ],
        },
        {
          key: "username",
          type: "input",
          label: t("auth.fields.username"),
          settings: {
            placeholder: t("auth.fields.username"),
            prefixIcon: "fa:tag",
          },
          rules: [
            {
              required: true,
              message: t("auth.fields.username_required"),
            },
          ],
        },
        {
          key: "email",
          type: "input",
          label: t("auth.fields.email"),
          settings: {
            placeholder: t("auth.fields.email"),
            prefixIcon: "fa:envelope",
          },
          rules: [
            {
              required: true,
              message: t("auth.fields.email_required"),
            },
          ],
        },
        {
          key: "password",
          type: "input.password",
          label: t("auth.fields.password"),
          settings: {
            placeholder: t("auth.fields.password"),
            prefixIcon: "fa:lock",
          },
          rules: [
            {
              required: true,
              message: t("auth.fields.password_required"),
            },
          ],
        },
      ]}
    />
  );
};
