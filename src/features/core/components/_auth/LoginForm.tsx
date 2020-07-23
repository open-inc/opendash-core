import * as React from "react";

import { Icon } from "@opendash/icons";

import { FormGenerator, useTranslation } from "../../../..";

export default ({ onSubmit }) => {
  const t = useTranslation();

  return (
    <FormGenerator
      onSubmit={(data) => {
        onSubmit(data);
      }}
      submit={{
        children: t("opendash:auth.fields.login_submit"),
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
          label: t("opendash:auth.fields.username"),
          settings: {
            placeholder: t("opendash:auth.fields.username"),
            prefixIcon: "fa:user",
          },
          rules: [
            {
              required: true,
              message: t("opendash:auth.fields.username_required"),
            },
          ],
        },
        {
          key: "password",
          type: "input.password",
          label: t("opendash:auth.fields.password"),
          settings: {
            placeholder: t("opendash:auth.fields.password"),
            prefixIcon: "fa:lock",
          },
          rules: [
            {
              required: true,
              message: t("opendash:auth.fields.password_required"),
            },
          ],
        },
      ]}
    />
  );
};
