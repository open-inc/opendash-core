import * as React from "react";
import { Modal, Select } from "antd";
import {
  useOpenDashApp,
  useTranslation,
  useUrlParam,
  useLocalStorage,
} from "../../../..";

export function LanguageSelection() {
  const [t, i18n] = useTranslation(["opendash"]);

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
      title={t("account.language.label")}
      onOk={(e) => setShowLangSelect(false)}
      onCancel={(e) => setShowLangSelect(false)}
    >
      <p>{t("account.language.info")}</p>
      <Select
        placeholder={t("account.language.placeholder")}
        defaultValue={lang}
        onChange={(nextLang) => {
          i18n.changeLanguage(nextLang);
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
