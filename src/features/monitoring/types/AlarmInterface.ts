import { DataItemDimensionIdentifierInterface } from "../../..";

type SpecificTrigger =
  | {
      type: "string_change";
    }
  | {
      type:
        | "string_includes"
        | "string_includes_not"
        | "string_starts_with"
        | "string_starts_with_not"
        | "string_ends_with"
        | "string_ends_with_not"
        | "string_equals"
        | "string_equals_not";
      string: string;
    }
  | {
      type: "number_change";
    }
  | {
      type: "number_equals" | "number_equals_not" | "number_gt" | "number_lt";
      value: number;
    }
  | {
      type: "number_in_range" | "number_out_of_range";
      min: number;
      max: number;
    }
  | {
      type:
        | "boolean_rising_edge"
        | "boolean_falling_edge"
        | "boolean_change"
        | "boolean_true"
        | "boolean_false";
    };

type Trigger = SpecificTrigger & {
  // type:
  //   | "string_change"
  //   | "string_equals"
  //   | "string_equals_not"
  //   | "string_includes"
  //   | "string_includes_not"
  //   | "string_starts_with"
  //   | "string_starts_with_not"
  //   | "string_ends_with"
  //   | "string_ends_with_not"
  //   | "boolean_change"
  //   | "boolean_true"
  //   | "boolean_false"
  //   | "boolean_rising_edge"
  //   | "boolean_falling_edge"
  //   | "number_change"
  //   | "number_equals"
  //   | "number_equals_not"
  //   | "number_gt"
  //   | "number_lt"
  //   | "number_in_range"
  //   | "number_out_of_range";
  // string?: string;
  // value?: number;
  // min?: number;
  // max?: number;
  interval: number;
};

type Action =
  | {
      type: "email";
      email: string;
    }
  | {
      type: "notification";
      notification: string;
    }
  | {
      type: "webhook";
      webhook: string;
    };

export interface AlarmInterface {
  id: string;
  item: DataItemDimensionIdentifierInterface;
  trigger: Trigger;
  action: Action;
}
