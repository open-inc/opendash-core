import * as React from "react";

import { FormElementRuleInterface } from "../../..";

export interface FormElementInterface {
  key: string;
  label: string;
  type: string;
  settings?: Record<string, any>;
  style?: React.CSSProperties;
  rules?: FormElementRuleInterface | FormElementRuleInterface[];
}
