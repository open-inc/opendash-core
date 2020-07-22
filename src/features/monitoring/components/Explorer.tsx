import * as React from "react";

import { Steps, Tabs, Divider } from "antd";

import produce from "immer";

import {
  DataItemIdentifierInterface,
  ExplorerStateInterface,
  useTranslation,
  DataSelect,
  DataItemHistoryOptionsPicker,
  useOpenDashServices,
  useWidgetTypes,
  validateDataFetchingSelection,
  useWidgetBaseContextDraftSetup,
  useWidgetContextSetup,
  WidgetSettingsRenderWithoutSteps,
  WidgetComponentRender,
} from "../../..";

import {
  Container,
  StepNav,
  SettingsHolder,
  Description,
} from "./Explorer.layout";

import { IconSelect } from "@opendash/ui";

export const Explorer = React.memo(function Explorer() {
  const [t] = useTranslation(["opendash"]);

  const { DataService } = useOpenDashServices();

  const widgets = useWidgetTypes();

  const [state, setState] = React.useState<ExplorerStateInterface>({
    step: 2,
    dataType: "dimension",
    itemDimensions: [
      ["demo@video.de", "demo.video.energieleistunga", 0],
      ["demo@video.de", "demo.video.energieleistungb", 0],
    ],
    fetchingOptions: {
      live: false,
      value: 1,
      unit: "week",
      historyType: "relative",
    },
    visualisation: null,
  });

  const visualisations = React.useMemo(() => {
    const valueTypes = state.itemDimensions
      .map(
        ([source, id, dimension]) =>
          DataService._getOrThrowSync(source, id)?.valueTypes[dimension]?.type
      )
      .filter((v, i, a) => a.indexOf(v) === i);

    return widgets
      .filter(
        (widget) =>
          widget.dataExplorer && widget.dataItems?.select === state.dataType
      )
      .map((widget) => {
        let disabled = false;
        let tooltip = null;

        if (
          widget.dataItems.select === "dimension" &&
          // @ts-ignore
          valueTypes.some((type) => !widget.dataItems.types?.includes(type))
        ) {
          disabled = true;
          tooltip = t("error.data.items_type");
        } else if (widget.dataItems.min > state.itemDimensions.length) {
          disabled = true;
          tooltip = t("error.data.items_min");
        } else if (widget.dataItems.max < state.itemDimensions.length) {
          disabled = true;
          tooltip = t("error.data.items_max");
        }

        if (!disabled) {
          const [valid, hint] = validateDataFetchingSelection(
            widget.dataFetching || {},
            state.fetchingOptions
          );

          if (!disabled && !valid) {
            disabled = true;
            tooltip = t(hint);
          }
        }

        return {
          value: widget.type,
          label: widget.dataExplorer.title,
          icon: widget.dataExplorer.icon,
          tooltip: tooltip || widget.dataExplorer.description,
          disabled,
        };
      });
  }, [state.itemDimensions, state.fetchingOptions]);

  const widgetConfig = React.useMemo(() => {
    const valueTypes = state.itemDimensions
      .map(
        ([source, id, dimension]) =>
          DataService._getOrThrowSync(source, id)?.valueTypes[dimension]?.type
      )
      .filter((v, i, a) => a.indexOf(v) === i);

    return {
      _dimensions: state.itemDimensions,
      _history: state.fetchingOptions,
      ...(widgets.find((w) => w.type === state.visualisation)?.dataExplorer
        ?.config || {}),
    };
  }, [state.visualisation, state.itemDimensions, state.fetchingOptions]);

  const widgetBaseContext = useWidgetBaseContextDraftSetup(
    state.visualisation,
    widgetConfig
  );

  const widgetContext = useWidgetContextSetup(widgetBaseContext);

  React.useEffect(() => {
    if (state.visualisation) {
      setState(
        produce((draft) => {
          draft.visualisation = visualisations.find((v) => !v.disabled)?.value;
        })
      );
    }
  }, [visualisations]);

  return (
    <Container>
      <StepNav>
        <Steps
          current={state.step}
          onChange={(step) =>
            setState(produce((draft) => void (draft.step = step)))
          }
        >
          <Steps.Step
            title={t("monitoring.explorer.step_data_title")}
            subTitle={t("monitoring.explorer.step_data_subtitle", {
              count: Math.max(state.itemDimensions?.length, 0),
            })}
          />

          <Steps.Step
            title={t("monitoring.explorer.step_fetching_title")}
            subTitle={t("monitoring.explorer.step_fetching_subtitle")}
          />

          <Steps.Step
            title={t("monitoring.explorer.step_vis_title")}
            subTitle={t("monitoring.explorer.step_vis_subtitle", {
              count: visualisations.filter((v) => !v.disabled).length,
            })}
          />

          <Steps.Step
            title={t("monitoring.explorer.step_settings_title")}
            subTitle={t("monitoring.explorer.step_settings_subtitle")}
          />

          <Steps.Step
            title={t("monitoring.explorer.step_preview_title")}
            subTitle={t("monitoring.explorer.step_preview_subtitle")}
          />
        </Steps>
      </StepNav>

      <Divider></Divider>

      <SettingsHolder>
        <Tabs
          activeKey={state.step.toString()}
          renderTabBar={() => <React.Fragment />}
        >
          <Tabs.TabPane tab={t("monitoring.explorer.step_data_title")} key="0">
            <Description
              children={t("monitoring.explorer.step_data_description")}
            />
            <DataSelect
              selectionOptions={{
                select: "dimension",
                min: 1,
              }}
              selection={state.itemDimensions}
              onSelection={(nextValue) => {
                setState(
                  produce((draft) => {
                    draft.itemDimensions = nextValue as DataItemIdentifierInterface[];
                  })
                );
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
              options={{ live: true, history: true, aggregation: true }}
              value={state.fetchingOptions}
              onChange={(nextValue) => {
                setState(
                  produce((draft) => {
                    draft.fetchingOptions = nextValue;
                  })
                );
              }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab={t("monitoring.explorer.step_vis_title")} key="2">
            <Description
              children={t("monitoring.explorer.step_vis_description")}
            />
            <IconSelect
              options={visualisations}
              value={state.visualisation}
              size={5}
              onChange={(nextValue) => {
                setState(
                  produce((draft) => {
                    draft.visualisation = nextValue;
                  })
                );
              }}
            />

            {/* <SettingsComponent {...context} /> */}
          </Tabs.TabPane>

          <Tabs.TabPane
            tab={t("monitoring.explorer.step_settings_title")}
            key="3"
          >
            <Description
              children={t("monitoring.explorer.step_settings_description")}
            />

            <WidgetSettingsRenderWithoutSteps
              key={state.visualisation + "~" + state.step}
              baseContext={widgetBaseContext}
              context={widgetContext}
            />
          </Tabs.TabPane>

          <Tabs.TabPane
            tab={t("monitoring.explorer.step_preview_title")}
            key="4"
          >
            <Description
              children={t("monitoring.explorer.step_preview_description")}
            />

            <div ref={widgetBaseContext.container} style={{ height: 500 }}>
              <WidgetComponentRender
                key={state.visualisation + "~" + state.step}
                baseContext={widgetBaseContext}
                context={widgetContext}
              />
            </div>
          </Tabs.TabPane>
        </Tabs>
      </SettingsHolder>
      {/* <pre>{JSON.stringify({ state, widgetBaseContext }, null, 2)}</pre> */}
    </Container>
  );
});
