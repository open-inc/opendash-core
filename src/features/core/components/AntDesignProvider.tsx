import * as React from "react";
import { ConfigProvider } from "antd";
import { ConfigProviderProps } from "antd/lib/config-provider";
import { useTranslation } from "../../..";

export function AntDesignProvider({ children }) {
  const { locale } = useLocale();

  return <ConfigProvider locale={locale} children={children} />;
}

function useLocale(): ConfigProviderProps {
  const t = useTranslation();

  return React.useMemo(() => {
    let locale = undefined;

    try {
      locale = JSON.parse(t("antd:json", { default: "{}" }));

      if (!locale.locale) {
        locale = undefined;
      }
    } catch (error) {
      console.error("@opendash/core: Error in translation parsing:", error);
    }

    return {
      locale,
    };
  }, [t]);
}
