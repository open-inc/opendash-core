import * as React from "react";
import { Icon } from "@opendash/icons";
import { Spin } from "antd";

import { useNavigate } from "react-router-dom";

import {
  useTranslation,
  useOpenDashServices,
  useUrlParam,
  useAppState,
  useCurrentUser,
} from "../../../..";

import {
  HeaderDropdown,
  HeaderDropdownText,
  HeaderDropdownButton,
} from "./header-dropdown";

export default function HeaderUserMenu({ right = false }) {
  const services = useOpenDashServices();
  const t = useTranslation();
  const user = useCurrentUser();
  const [, setShowLangSelect] = useUrlParam("opendash_language", false, "json");
  const navigate = useNavigate();

  if (!user) {
    return (
      <HeaderDropdown right={right}>
        <HeaderDropdownText style={{ textAlign: "center" }}>
          <Spin />
        </HeaderDropdownText>
      </HeaderDropdown>
    );
  }

  return (
    <HeaderDropdown right={right}>
      <HeaderDropdownText>
        <div style={{ fontSize: ".8em" }}>
          {t("opendash:auth.greeting_dropdown")}
        </div>
        <div>{user.name || user.username || user.email}</div>
      </HeaderDropdownText>
      <HeaderDropdownButton onClick={(e) => setShowLangSelect(true)}>
        <Icon icon="fa:globe" />
        <span>{t("opendash:account.language.label")}</span>
      </HeaderDropdownButton>
      {/* <HeaderDropdownButton
        onClick={(e) => navigate("/account/data-item-overview")}
      >
        <Icon icon="fa:database" />
        <span>{t("opendash:account.data_item_settings.label")}</span>
      </HeaderDropdownButton> */}
      {/* <HeaderDropdownButton>
        <Icon type="setting" />
        <span>{t("opendash:account.settings.label")}</span>
      </HeaderDropdownButton> */}
      <HeaderDropdownButton onClick={(e) => services.UserService.logout()}>
        <Icon icon="fa:sign-out" />
        <span>{t("opendash:auth.logout")}</span>
      </HeaderDropdownButton>
    </HeaderDropdown>
  );
}
