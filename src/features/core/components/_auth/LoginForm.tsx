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
        children: t("auth.fields.login_submit"),
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
          key: "username",
          type: "input",
          label: t("auth.fields.username"),
          settings: {
            placeholder: t("auth.fields.username"),
            prefixIcon: "fa:user",
          },
          rules: [
            {
              required: true,
              message: t("auth.fields.username_required"),
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
