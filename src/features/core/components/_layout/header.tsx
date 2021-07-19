import * as React from "react";
import styled from "styled-components";

import { Icon } from "@opendash/icons";

import { Dropdown, Avatar } from "antd";

import { useNavigate } from "react-router-dom";
import {
  OpenDashLogo,
  useAppState,
  useOpenDashApp,
  Hamburger,
  useCurrentUser,
} from "../../../..";

import { HeaderMenuItem as MenuItem } from "@opendash/ui";

import UserMenu from "./menu-user";

import theme from "./theme";

import SourcePicker from "./source-picker";

const MainMenu = styled.div`
  position: relative;
  display: flex;
  /* padding: 0 24px; */
  padding: 0;
  height: 48px;
  border-bottom: 2px solid #0063ac;
`;

const MainMenuLeft = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const MainMenuCenter = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainMenuRight = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const MenuRef = styled.div`
  float: left;
  height: ${theme.header.lineHeight};
  line-height: ${theme.header.lineHeight};
`;

export default function AppLayout() {
  const navigate = useNavigate();
  const user = useCurrentUser();
  const sidebar = useAppState((state) => state.ui.sidebar);
  const [open, setOpen] = React.useState(false);

  const app = useOpenDashApp();

  return (
    <MainMenu>
      {user && (
        <MainMenuLeft>
          <MenuRef
            key="headerBeforeMenuLeft"
            ref={app.ui.refs.headerBeforeMenuLeft}
          />
          <MenuRef key="headerAfterLogo" ref={app.ui.refs.headerAfterLogo} />

          {sidebar.visible && (
            <MenuItem
              key="apps"
              style={{ paddingTop: 6, paddingRight: 10 }}
              onClick={() => {
                app.state.update((draft) => {
                  draft.ui.sidebar.open = !draft.ui.sidebar.open;
                });
              }}
            >
              <Hamburger open={sidebar.open} setOpen={(isOpen) => {}} />
            </MenuItem>
          )}
          {/* {!app.ui.disableHeaderSourcePicker && (
            <MenuItem key="source">
              <SourcePicker></SourcePicker>
            </MenuItem>
          )} */}
          <MenuRef
            key="headerAfterMenuLeft"
            ref={app.ui.refs.headerAfterMenuLeft}
          />
        </MainMenuLeft>
      )}

      <MainMenuCenter>
        <MenuRef key="headerBeforeLogo" ref={app.ui.refs.headerBeforeLogo} />
        <OpenDashLogo
          style={{
            display: "block",
            height: "100%",
            width: "auto",
            padding: 4,
          }}
        />
        <MenuRef key="headerAfterLogo" ref={app.ui.refs.headerBeforeLogo} />
      </MainMenuCenter>

      {user && (
        <MainMenuRight>
          <MenuRef
            key="headerBeforeMenuRight"
            ref={app.ui.refs.headerBeforeMenuRight}
          />
          <Dropdown
            trigger={["click"]}
            placement="bottomLeft"
            overlay={<UserMenu right />}
            children={
              <MenuItem>
                <Icon icon="fa:user" />
                {/* <Icon icon="fa:user-circle" /> */}
              </MenuItem>
            }
          />
          <MenuRef
            key="headerAfterMenuRight"
            ref={app.ui.refs.headerAfterMenuRight}
          />
        </MainMenuRight>
      )}
    </MainMenu>
  );
}
