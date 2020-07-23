import * as React from "react";
import { useTranslation } from "../../..";

export const Translate = React.memo<{
  t: string;
}>(function Translate({ t: translationIdentifier }) {
  const t = useTranslation();

  // TODO:
  // @ts-ignore
  return t(translationIdentifier) as React.ReactElement;
});
