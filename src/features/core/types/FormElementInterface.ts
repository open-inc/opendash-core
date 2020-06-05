import * as React from "react";

import { FormElementRuleInterface } from "../../..";

export interface FormElementInterface {
  key: string;
  label: string;
  type: string;
  settings?: Record<string, any>;
  visible?: boolean | ((state: any) => boolean);
  defaultValue?: any;
  style?: React.CSSProperties;
  rules?: FormElementRuleInterface | FormElementRuleInterface[];
}
