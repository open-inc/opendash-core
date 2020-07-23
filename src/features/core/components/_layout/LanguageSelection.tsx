import * as React from "react";
import { Modal, Select } from "antd";
import {
  useOpenDashApp,
  useTranslation,
  useUrlParam,
  useLocalStorage,
} from "../../../..";

import { changeLanguage } from "@opendash/i18n";

export function LanguageSelection() {
  const t = useTranslation();

  const app = useOpenDashApp();
  const [showLangSelect, setShowLangSelect] = useUrlParam(
    "opendash_language",
    false,
    "json"
  );

  const [lang, setLang] = useLocalStorage("opendash:language");

  return (
    <Modal
      visible={showLangSelect}
      title={t("opendash:account.language.label")}
      onOk={(e) => setShowLangSelect(false)}
      onCancel={(e) => setShowLangSelect(false)}
    >
      <p>{t("opendash:account.language.info")}</p>
      <Select
        placeholder={t("opendash:account.language.placeholder")}
        defaultValue={lang}
        onChange={(nextLang) => {
          changeLanguage(nextLang);
          setLang(nextLang);
        }}
        style={{ width: "100%" }}
      >
        {app.ui.languages.map(({ key, label }) => (
          <Select.Option key={key} value={key}>
            {label}
          </Select.Option>
        ))}
      </Select>
    </Modal>
  );
}
