import * as React from "react";

import styled from "styled-components";
import { Drawer } from "antd";

import {
  useOpenDashApp,
  useAppState,
  NavigationMenu,
  LinkedSourcePicker,
} from "../../..";

export const Container = styled.div`
  .ant-menu-submenu-title {
    font-weight: bold;
  }

  .ant-menu-inline .ant-menu-submenu-title {
    padding-right: 16px;
  }

  .ant-menu-submenu-arrow {
    display: none;
  }

  .ant-menu-inline.ant-menu-inline
    > .ant-menu-item-group
    > .ant-menu-item-group-list
    > .ant-menu-item,
  .ant-menu-inline > .ant-menu-item,
  .ant-menu-inline
    > .ant-menu-item-group
    > .ant-menu-item-group-list
    > .ant-menu-item,
  .ant-menu-inline > .ant-menu-item-group > .ant-menu-item-group-title,
  .ant-menu-inline > .ant-menu-submenu > .ant-menu-submenu-title {
    padding-left: 16px !important;
  }
`;

const ContentContainer = styled.div``;

const SourcePickerContainer = styled.div`
  padding: 16px;
`;

interface Props extends React.PropsWithChildren<{}> {
  showSourcePicker?: boolean;
}

export const AppSidebar = React.memo<Props>(function AppSidebar({
  children,
  showSourcePicker,
}) {
  const app = useOpenDashApp();
  const sidebar = useAppState((state) => state.ui.sidebar);

  React.useEffect(() => {
    app.state.update((draft) => {
      draft.ui.sidebar.visible = true;
    });

    return () => {
      app.state.update((draft) => {
        draft.ui.sidebar.open = false;
        draft.ui.sidebar.visible = false;
      });
    };
  }, []);

  return (
    <Drawer
      visible={sidebar.open}
      onClose={() =>
        app.state.update((draft) => {
          draft.ui.sidebar.open = false;
        })
      }
      closable={false}
      placement="left"
      getContainer={false}
      style={{ position: "absolute" }}
      bodyStyle={{ padding: 0 }}
      width={300}
    >
      <Container
        onClick={() => {
          app.state.update((draft) => {
            draft.ui.sidebar.open = false;
          });
        }}
      >
        {showSourcePicker && (
          <SourcePickerContainer onClick={(e) => e.stopPropagation()}>
            <LinkedSourcePicker style={{ width: "100%" }} />
          </SourcePickerContainer>
        )}

        <ContentContainer>{children}</ContentContainer>

        <NavigationMenu />
      </Container>
    </Drawer>
  );
});
