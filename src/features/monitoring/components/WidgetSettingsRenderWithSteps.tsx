import * as React from "react";

import {
  SourceIdentifierInterface,
  DataItemIdentifierInterface,
  DataItemDimensionIdentifierInterface,
  WidgetContextInterface,
  WidgetBaseContextInterface,
  useTranslation,
  DataSelect,
  DataItemHistoryOptionsPicker,
} from "../../..";

import { Steps, Tabs, Divider } from "antd";

import {
  Container,
  StepNav,
  SettingsHolder,
  Description,
} from "./WidgetSettingsRenderWithSteps.layout";

export const WidgetSettingsRenderWithSteps = React.memo<{
  context: WidgetContextInterface;
  baseContext: WidgetBaseContextInterface;
}>(function WidgetSettingsRenderWithSteps({ context, baseContext }) {
  const [t] = useTranslation(["opendash"]);
  const [step, setStep] = React.useState(0);

  const SettingsComponent = React.useMemo(
    () =>
      baseContext?.type?.settingsComponent
        ? React.lazy(baseContext.type.settingsComponent)
        : null,
    [baseContext?.type?.settingsComponent]
  );

  return (
    <Container>
      <StepNav>
        <Steps current={step} onChange={setStep}>
          <Steps.Step
            disabled={!baseContext?.type?.dataItems}
            title={t("monitoring.explorer.step_data_title")}
            subTitle={t("monitoring.explorer.step_data_subtitle", {
              count: Math.max(
                context.draft._sources?.length,
                context.draft._items?.length,
                context.draft._dimensions?.length
              ),
            })}
          />

          <Steps.Step
            disabled={!baseContext?.type?.dataFetching}
            title={t("monitoring.explorer.step_fetching_title")}
            subTitle={t("monitoring.explorer.step_fetching_subtitle")}
          />

          <Steps.Step
            disabled={!SettingsComponent}
            title={t("monitoring.explorer.step_settings_title")}
            subTitle={
              !SettingsComponent
                ? t("monitoring.explorer.step_settings_no_settings")
                : t("monitoring.explorer.step_settings_subtitle")
            }
          />
        </Steps>
      </StepNav>

      <Divider></Divider>

      <SettingsHolder>
        <Tabs
          activeKey={step.toString()}
          renderTabBar={() => <React.Fragment />}
        >
          <Tabs.TabPane tab={t("monitoring.explorer.step_data_title")} key="0">
            <Description
              children={t("monitoring.explorer.step_data_description")}
            />
            <DataSelect
              selectionOptions={baseContext?.type?.dataItems}
              selection={
                baseContext?.type?.dataItems?.select === "source"
                  ? context.draft._sources
                  : baseContext?.type?.dataItems?.select === "item"
                  ? context.draft._items
                  : baseContext?.type?.dataItems?.select === "dimension"
                  ? context.draft._dimensions
                  : []
              }
              onSelection={(nextValue) => {
                context.updateDraft((draft) => {
                  if (baseContext?.type?.dataItems?.select === "source") {
                    draft._sources = nextValue as SourceIdentifierInterface[];
                    draft._items = [];
                    draft._dimensions = [];
                  }
                  if (baseContext?.type?.dataItems?.select === "item") {
                    draft._sources = [];
                    draft._items = nextValue as DataItemIdentifierInterface[];
                    draft._dimensions = [];
                  }
                  if (baseContext?.type?.dataItems?.select === "dimension") {
                    draft._sources = [];
                    draft._items = [];
                    draft._dimensions = nextValue as DataItemDimensionIdentifierInterface[];
                  }
                });
              }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={t("monitoring.explorer.step_fetching_title")}
            key="1"
          >
            <Description
              children={t("monitoring.explorer.step_fetching_description")}
            />
            <DataItemHistoryOptionsPicker
              options={baseContext?.type?.dataFetching}
              value={context.draft._history}
              onChange={(nextValue) => {
                context.updateDraft((draft) => {
                  draft._history = nextValue;
                });
              }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={t("monitoring.explorer.step_settings_title")}
            key="2"
          >
            <SettingsComponent {...context} />
          </Tabs.TabPane>
        </Tabs>
      </SettingsHolder>
    </Container>
  );
});
