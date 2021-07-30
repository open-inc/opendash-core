import * as React from "react";

import { onLanguageChange, onTranslationChange, __debug } from "@opendash/i18n";
import { Table, Typography } from "antd";

import { AdminLayout, useForceRender } from "../../..";

export const DebugTranslationsRoute = React.memo(
  function DebugTranslationsRoute() {
    const state = __debug();

    const forceRender = useForceRender();

    React.useEffect(() => {
      return onTranslationChange((namespace) => {
        forceRender();
      });
    }, []);

    React.useEffect(() => {
      return onLanguageChange((lang) => {
        forceRender();
      });
    }, []);

    const dataSource = Object.entries(state.translations).flatMap(
      ([language, namespaceMap]) => {
        return Object.entries(namespaceMap).flatMap(
          ([namespace, translationMap]) => {
            return Object.entries(translationMap).map(
              ([translationKey, translation]) => {
                return {
                  language,
                  namespace,
                  translationKey,
                  translation,
                };
              }
            );
          }
        );
      }
    );

    return (
      <AdminLayout>
        {/* <pre>
          {JSON.stringify(
            {
              language: state.language,
              languages: state.languages,
            },
            null,
            2
          )}
        </pre> */}
        <Table
          pagination={false}
          dataSource={dataSource}
          columns={[
            // {
            //   title: "language",
            //   dataIndex: "language",
            //   key: "language",
            // },
            // {
            //   title: "namespace",
            //   dataIndex: "namespace",
            //   key: "namespace",
            // },
            {
              title: "translationKey",
              dataIndex: "translationKey",
              key: "translationKey",
              render: (value, row) => {
                const key = `${row.namespace}:${row.translationKey}`;
                const code = `t("${key}")`;

                return (
                  <Typography.Paragraph
                    copyable={{ text: code }}
                    children={key}
                    style={{ margin: 0 }}
                  />
                );
              },
            },
            {
              title: "translation",
              dataIndex: "translation",
              key: "translation",
            },
          ]}
        />
      </AdminLayout>
    );
  }
);
