import * as React from "react";
import { Loading } from "../../..";

interface Props {}

export const Suspense: React.FC<Props> = ({ children }) => {
  return (
    <React.Suspense fallback={<Loading message="" />} children={children} />
  );
};
