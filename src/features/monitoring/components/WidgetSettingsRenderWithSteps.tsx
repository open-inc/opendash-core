import * as React from "react";

import {
  SourceIdentifierInterface,
  DataItemIdentifierInterface,
  DataItemDimensionIdentifierInterface,
  WidgetContextInterface,
  WidgetContext,
  useTranslation,
  DataSelect,
  DataItemHistoryOptionsPicker,
  createInternalComponent,
  useServiceStore,
} from "../../..";

import { Collapse } from "antd";

import {
  Container,
  SettingsHolder,
  Description,
} from "./WidgetSettingsRenderWithSteps.layout";

export const WidgetSettingsRenderWithSteps = createInternalComponent<{
  context: WidgetContextInterface;
}>(function WidgetSettingsRenderWithSteps({ context }) {
  const t = useTranslation();
  const [step, setStep] = React.useState(
    context.context.type?.dataItems
      ? 0
      : context.context.type?.dataFetching
      ? 1
      : 2
  );

  const SettingsComponent = React.useMemo(
    () =>
      context.context.type?.settingsComponent
        ? React.lazy(context.context.type.settingsComponent)
        : null,
    [context.context?.type?.settingsComponent]
  );

  const currentDraft = useServiceStore(context.context, (state) => state.draft);

  return (
    <Container>
      <SettingsHolder>
        <Collapse
          bordered={false}
          accordion={true}
          activeKey={step.toString()}
          onChange={(key) =>
            setStep(parseInt(Array.isArray(key) ? key[0] : key))
          }
        >
          {context.context.type?.dataItems && (
            <Collapse.Panel
              header={t("opendash:monitoring.explorer.step_data_title")}
              key="0"
            >
              <Description
                children={t(
                  "opendash:monitoring.explorer.step_data_description"
                )}
              />
              <DataSelect
                showValue={true}
                showTimestamp={true}
                selectionOptions={context.context?.type?.dataItems}
                selection={
                  context.context?.type?.dataItems?.select === "source"
                    ? currentDraft._sources
                    : context.context?.type?.dataItems?.select === "item"
                    ? currentDraft._items
                    : context.context?.type?.dataItems?.select === "dimension"
                    ? currentDraft._dimensions
                    : []
                }
                onSelection={(nextValue) => {
                  context.context.updateDraft((draft) => {
                    if (context.context?.type?.dataItems?.select === "source") {
                      draft._sources = nextValue as SourceIdentifierInterface[];
                      draft._items = [];
                      draft._dimensions = [];
                    }
                    if (context.context?.type?.dataItems?.select === "item") {
                      draft._sources = [];
                      draft._items = nextValue as DataItemIdentifierInterface[];
                      draft._dimensions = [];
                    }
                    if (
                      context.context?.type?.dataItems?.select === "dimension"
                    ) {
                      draft._sources = [];
                      draft._items = [];
                      draft._dimensions = nextValue as DataItemDimensionIdentifierInterface[];
                    }
                  });
                }}
              />
            </Collapse.Panel>
          )}
          {context.context.type?.dataFetching && (
            <Collapse.Panel
              header={t("opendash:monitoring.explorer.step_fetching_title")}
              key="1"
            >
              <Description
                children={t(
                  "opendash:monitoring.explorer.step_fetching_description"
                )}
              />
              <DataItemHistoryOptionsPicker
                options={context.context?.type?.dataFetching}
                value={currentDraft?._history}
                onChange={(nextValue) => {
                  context.context.updateDraft((draft) => {
                    draft._history = nextValue;
                  });
                }}
              />
            </Collapse.Panel>
          )}
          {context.context.type?.settingsComponent && (
            <Collapse.Panel
              header={t("opendash:monitoring.explorer.step_settings_title")}
              key="2"
            >
              <SettingsComponent {...context} />
            </Collapse.Panel>
          )}
        </Collapse>
      </SettingsHolder>
    </Container>
  );
});
