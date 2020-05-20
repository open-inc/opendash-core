import * as React from "react";
import { useTranslation } from "../../..";

export const Translate = React.memo<{
  t: string;
  ns?: string[];
}>(function Translate({ t: translationIdentifier, ns = ["opendash"] }) {
  const [t] = useTranslation(ns);

  return t(translationIdentifier);
});
