import * as React from "react";

import { Layout } from "antd";

import { useTranslation, useOpenDashApp } from "../../../..";

import Header from "./header";
import { LanguageSelection } from "./LanguageSelection";

import theme from "./theme";

export default function AppLayout({ children }) {
  const t = useTranslation();

  const app = useOpenDashApp();

  return (
    <Layout style={theme.layout}>
      {!app.ui.disableHeader && (
        <Layout.Header style={theme.header}>
          <Header />
          <LanguageSelection />
        </Layout.Header>
      )}

      <Layout.Content style={theme.content}>{children}</Layout.Content>

      {!app.ui.disableFooter && (
        <Layout.Footer style={theme.footer}>
          {t("opendash:ui.copyright")}
        </Layout.Footer>
      )}
    </Layout>
  );
}
