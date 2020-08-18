import * as React from "react";
import * as ReactDOM from "react-dom";

import { useOpenDashApp, useAppState } from "../../..";
import { Button } from "antd";

interface Props {}

export const AppContextMenu = React.memo<Props>(function AppContextMenu() {
  return <Button type="text">Hallo Welt</Button>;
});
