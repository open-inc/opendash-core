import * as React from "react";
import { Icon as LegacyIcon } from "@ant-design/compatible";
import { Spin } from "antd";

import {
  useTranslation,
  useOpenDashServices,
  useUrlParam,
  useAppState,
} from "../../../..";

import {
  HeaderDropdown,
  HeaderDropdownText,
  HeaderDropdownButton,
} from "./header-dropdown";

export default function HeaderUserMenu({ right = false }) {
  const services = useOpenDashServices();
  const [t] = useTranslation(["opendash"]);
  const user = useAppState((state) => state.user.current);
  const [, setShowLangSelect] = useUrlParam("opendash_language", false, "json");

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
        <div style={{ fontSize: ".8em" }}>{t("auth.greeting_dropdown")}</div>
        <div>{user.name || user.username || user.email}</div>
      </HeaderDropdownText>
      <HeaderDropdownButton onClick={(e) => setShowLangSelect(true)}>
        <LegacyIcon type="global" />
        <span>{t("account.language.label")}</span>
      </HeaderDropdownButton>
      {/* <HeaderDropdownButton>
        <Icon type="setting" />
        <span>{t("account.settings.label")}</span>
      </HeaderDropdownButton> */}
      <HeaderDropdownButton onClick={(e) => services.UserService.logout()}>
        <LegacyIcon type="logout" />
        <span>{t("auth.logout")}</span>
      </HeaderDropdownButton>
    </HeaderDropdown>
  );
}
