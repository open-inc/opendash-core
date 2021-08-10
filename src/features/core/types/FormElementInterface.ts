import * as React from "react";

import { FormElementRuleInterface } from "../../..";

export interface FormElementInterface {
  key: string;
  /**
   * If omitted, it will be the same as key
   */
  name?: string | number | (string | number)[];
  label: string;
  hint?: string;
  description?: string;
  type: string;
  settings?: Record<string, any>;
  visible?: boolean | ((state: any) => boolean);
  defaultValue?: any;
  style?: React.CSSProperties;
  rules?: FormElementRuleInterface | FormElementRuleInterface[];
}
