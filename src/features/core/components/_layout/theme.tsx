import { CSSProperties } from "react";

const layout: CSSProperties = {
  minHeight: "100vh",
};
const content: CSSProperties = {
  position: "relative",
  height: "100%",
};
const header: CSSProperties = {
  height: "48px",
  lineHeight: "46px",
  padding: 0,
  // background: "#001529",
  background: "white",
};
const footer: CSSProperties = {
  textAlign: "center",
  background: "rgba(0,0,0,.05)",
};

export default {
  layout,
  content,
  header,
  footer,
};
