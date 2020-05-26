import * as React from "react";
import styled from "styled-components";

import { Icon as LegacyIcon } from "@ant-design/compatible";

import { Dropdown } from "antd";

import { useNavigate } from "react-router-dom";
import { OpenDashLogo, useAppState, useOpenDashApp } from "../../../..";

import { HeaderMenuItem as MenuItem } from "@opendash/ui";

import UserMenu from "./menu-user";

import theme from "./theme";

import SourcePicker from "./source-picker";

const MainMenu = styled.div`
  position: relative;
  display: flex;
  padding: 0 24px;
  height: 48px;
  border-bottom: 2px solid #0063ac;
`;

const MainMenuLeft = styled.div`
  display: flex;
  flex: 1 1;
`;

const MainMenuRight = styled.div`
  float: right;
`;

const MainMenuCenter = styled.div`
  margin: 0 auto;
`;

const MenuRef = styled.div`
  float: left;
  height: ${theme.header.lineHeight};
  line-height: ${theme.header.lineHeight};
`;

export default function AppLayout() {
  const navigate = useNavigate();
  const user = useAppState((state) => state.user.current);
  const [open, setOpen] = React.useState(false);

  const app = useOpenDashApp();

  if (!user) {
    return (
      <MainMenu>
        <MainMenuCenter>
          <MenuItem key="home" style={{ cursor: "default" }}>
            <OpenDashLogo
              style={{
                display: "block",
                height: "100%",
                width: "auto",
                padding: 4,
              }}
            />
          </MenuItem>
        </MainMenuCenter>
      </MainMenu>
    );
  }

  return (
    <MainMenu>
      <MainMenuLeft>
        <MenuRef
          key="headerBeforeMenuLeft"
          ref={app.ui.refs.headerBeforeMenuLeft}
        />
        <MenuItem
          key="home"
          onClick={(e) => navigate("/")}
          style={{ paddingLeft: 0 }}
        >
          <OpenDashLogo
            style={{
              display: "block",
              height: "100%",
              width: "auto",
              padding: "4px 0",
            }}
          />
        </MenuItem>
        <MenuRef key="headerAfterLogo" ref={app.ui.refs.headerAfterLogo} />
        <MenuItem key="source">
          <SourcePicker></SourcePicker>
        </MenuItem>
        <MenuRef
          key="headerAfterMenuLeft"
          ref={app.ui.refs.headerAfterMenuLeft}
        />
      </MainMenuLeft>
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
            <MenuItem style={{ marginRight: -10 }}>
              <LegacyIcon type="user" />
            </MenuItem>
          }
        />
        <MenuRef
          key="headerAfterMenuRight"
          ref={app.ui.refs.headerAfterMenuRight}
        />
      </MainMenuRight>
    </MainMenu>
  );
}
