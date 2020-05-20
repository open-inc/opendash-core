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
} from "../../..";

interface Props {
  id: string;
  fullscreen?: boolean;
}

export const WidgetComponent = React.memo<Props>(({ id, fullscreen }) => {
  const context = useWidgetBaseContextSetup(id, fullscreen);

  React.useEffect(() => {
    if (context?.state.share) {
      message.info("Coming soon..");
      context?.setState({ share: false });
    }
  }, [context?.state.share]);

  return (
    <>
      <WidgetComponentLayout
        key={context?.state.key}
        layout="default"
        {...context}
      >
        <WidgetErrorBoundary context={context}>
          <Suspense>
            <Spin spinning={context?.state.loading}>
              <WidgetComponentRender context={context} />
            </Spin>
          </Suspense>
        </WidgetErrorBoundary>
      </WidgetComponentLayout>

      <WidgetRenamingModal
        id={id}
        open={context?.state.rename}
        close={() => context?.setState({ rename: false })}
      />

      <WidgetDeletionModal
        id={id}
        open={context?.state.delete}
        close={() => context?.setState({ delete: false })}
      />

      <WidgetSettingsModal
        id={id}
        open={context?.state.settings}
        close={() => context?.setState({ settings: false })}
      />
    </>
  );
});
