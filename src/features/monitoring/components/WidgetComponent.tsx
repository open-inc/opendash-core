import * as React from "react";

import { message, Spin } from "antd";

import {
  useWidgetBaseContextSetup,
  WidgetComponentRender,
  WidgetErrorBoundary,
  Suspense,
  WidgetSettingsModal,
  WidgetRenamingModal,
  WidgetDeletionModal,
  WidgetComponentLayout,
  createInternalComponent,
  useServiceStore,
  WidgetReactContext,
} from "../../..";

interface Props {
  id: string;
  fullscreen?: boolean;
}

export const WidgetComponent = createInternalComponent<Props>(
  function WidgetComponent({ id, fullscreen }) {
    const context = useWidgetBaseContextSetup(id, fullscreen);

    const key = useServiceStore(context, (state) => state.key);
    const loading = useServiceStore(context, (state) => state.loading);
    const rename = useServiceStore(context, (state) => state.rename);
    const del = useServiceStore(context, (state) => state.delete);
    const settings = useServiceStore(context, (state) => state.settings);

    return (
      <WidgetReactContext.Provider value={context}>
        <WidgetComponentLayout
          key={key}
          layout={fullscreen ? "fullscreen" : "default"}
          context={context}
        >
          <WidgetErrorBoundary context={context}>
            <Suspense>
              <Spin spinning={loading}>
                <WidgetComponentRender baseContext={context} />
              </Spin>
            </Suspense>
          </WidgetErrorBoundary>
        </WidgetComponentLayout>

        <WidgetRenamingModal
          id={id}
          open={rename}
          close={() => {
            context.store.update((state) => {
              state.rename = false;
            });
          }}
        />

        <WidgetDeletionModal
          id={id}
          open={del}
          close={() => {
            context.store.update((state) => {
              state.delete = false;
            });
          }}
        />

        <WidgetSettingsModal
          id={id}
          open={settings}
          close={() => {
            context.store.update((state) => {
              state.settings = false;
            });

            context.refresh();
          }}
        />
      </WidgetReactContext.Provider>
    );
  }
);
