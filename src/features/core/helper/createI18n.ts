import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import { TranslationResolverInterface } from "../../..";

export function createI18n(
  languages: { key: string; label: string; fallback: string }[],
  translationResolvers: Map<string, TranslationResolverInterface>
): i18next.i18n {
  const i18n = i18next.createInstance();
  const l = window.localStorage.getItem("opendash:language")
    ? JSON.parse(window.localStorage.getItem("opendash:language"))
    : "en";

  const fallbackLng = { default: ["en"] };
  const availableLanguages = ["en", ...languages.map((l) => l.key)];
  const availableNamespaces = Array.from(translationResolvers.keys())
    .map((ns) => ns.split(",")[1])
    .filter((v, i, a) => a.indexOf(v) === i);

  languages.forEach((lang) => {
    fallbackLng[lang.key] = [lang.fallback, "en"];
  });

  i18n
    .use(initReactI18next)
    .use({
      type: "backend",
      init(services, backendOptions, i18nextOptions) {},
      read(language, namespace, callback) {
        const resolver = translationResolvers.get(
          [language, namespace].join(",")
        );

        if (!resolver) {
          return callback(
            new Error(
              `Missing Translation Resolver for ${language} ${namespace}`
            )
          );
        }

        Promise.resolve(resolver()).then(
          (translation) => {
            try {
              if (
                translation?.default &&
                (Object.keys(translation).length === 1 ||
                  translation.__esModule === true)
              ) {
                callback(null, translation.default);
              } else {
                callback(null, translation);
              }
            } catch (error) {
              callback(error);
            }
          },
          (error) => {
            callback(error);
          }
        );
      },
    })
    .init({
      lng: l,
      fallbackLng,

      debug: false,

      ns: availableNamespaces,
      whitelist: availableLanguages,

      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
    });

  return i18n;
}
