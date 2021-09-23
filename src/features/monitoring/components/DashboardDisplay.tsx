import * as React from "react";
import styled from "styled-components";

import GridLayout from "react-grid-layout";

import { Icon } from "@opendash/icons";

import {
  useElementSize,
  WidgetComponent,
  DashboardInterface,
  useWidgetsForDashboard,
  useUrlParam,
  useOpenDashServices,
  useDeepCompareEffect,
  useTranslation,
  useWidgetTypes,
  createInternalComponent,
  DashboardStyle,
  equals,
} from "../../..";

import { ErrorMessage } from "./_layout";

interface Props {
  dashboard: DashboardInterface;
}

const Container = styled.div`
  overflow-x: hidden;
  overflow-y: hidden;

  min-height: 100%;

  > .react-grid-layout {
    min-height: 100%;
  }
`;

export const DashboardDisplay = createInternalComponent<Props>(
  function DashboardDisplay({ dashboard }) {
    const { MonitoringService } = useOpenDashServices();
    const t = useTranslation();

    const container = React.useRef();
    const size = useElementSize(container, 1000);

    const [layout, setLayout] = React.useState(dashboard?.layout || []);

    const widgets = useWidgetsForDashboard(dashboard);
    const widgetTypes = useWidgetTypes();

    const [editMode] = useUrlParam("dashboard_edit", false);

    const [, setAddDashboard] = useUrlParam("db_create", false);
    const [, setAddWidgets] = useUrlParam("db_add_widgets", false);

    // Update layout, if it changes elsewhere
    useDeepCompareEffect(() => {
      if (dashboard?.layout && !equals(layout, dashboard.layout)) {
        setLayout(dashboard.layout);
      }
    }, [dashboard?.id, dashboard?.layout]);

    if (!dashboard) {
      return (
        <ErrorMessage
          ref={container}
          icon={<Icon icon="fa:frown" />}
          title={t("opendash:monitoring.dashboards.error.no_dashboard.title")}
          message={t(
            "opendash:monitoring.dashboards.error.no_dashboard.message"
          )}
          actionLabel={t("opendash:dashboards.create.action")}
          actionClick={() => {
            setAddDashboard(true);
          }}
        />
      );
    }

    if (widgets?.length === 0) {
      return (
        <ErrorMessage
          ref={container}
          icon={<Icon icon="fa:frown" />}
          title={t("opendash:monitoring.dashboards.error.no_widgets.title")}
          message={t("opendash:monitoring.dashboards.error.no_widgets.message")}
          actionLabel={t("opendash:widgets.create.action")}
          actionClick={() => {
            setAddWidgets(true);
          }}
        />
      );
    }

    if (size.width < 600) {
      return (
        <Container ref={container}>
          {widgets.map((widget) => {
            const containerWidth = size.width;

            const widgetType = widgetTypes.find(
              (wt) => wt.type === widget.type
            );

            const orientation = window.matchMedia("(orientation: portrait)")
              .matches
              ? "portrait"
              : "landscape";

            const width = widgetType.mobileSize
              ? widgetType.mobileSize(containerWidth, orientation)
              : (containerWidth / 3) * 2;

            if (width === null) {
              return null;
            }

            return (
              <div
                key={widget.id}
                style={{
                  height: Math.floor(width),
                  padding: 10,
                }}
              >
                <WidgetComponent id={widget.id} />
              </div>
            );
          })}
        </Container>
      );
    }

    return (
      <Container ref={container}>
        <DashboardStyle />
        <GridLayout
          key={dashboard.id}
          verticalCompact={true}
          width={size.width}
          margin={[0, 0]}
          cols={24}
          rowHeight={Math.floor(size.width / 24)}
          layout={layout}
          isDraggable={editMode}
          isResizable={editMode}
          onLayoutChange={(nextLayout) => {
            MonitoringService.updateDashboardLayout(nextLayout);
          }}
        >
          {widgets.map((widget) => (
            <div key={widget.id} style={{ padding: 10 }}>
              <WidgetComponent id={widget.id} />
            </div>
          ))}
        </GridLayout>
      </Container>
    );
  }
);
