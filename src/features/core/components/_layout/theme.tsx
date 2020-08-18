import { CSSProperties } from "react";

const layout: CSSProperties = {
  minHeight: "100vh",
};
const content: CSSProperties = {
  position: "relative",
  height: "100%",
  width: "100%",
  display: "flex",
  alignSelf: "stretch",
};
const header: CSSProperties = {
  height: "48px",
  lineHeight: "46px",
  padding: 0,
  // background: "#001529",
  background: "white",
};
const menu: CSSProperties = {
  height: "40px",
  lineHeight: "40px",
  padding: "0 7px",
  background: "#ffffff",
  borderBottom: "1px solid #f0f0f0",
};
const footer: CSSProperties = {
  textAlign: "center",
  background: "rgba(0,0,0,.05)",
};

export default {
  layout,
  content,
  header,
  menu,
  footer,
};
