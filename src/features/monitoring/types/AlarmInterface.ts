import { DataItemDimensionIdentifierInterface } from "../../..";

type Trigger =
  | {
      type: "string_change";
    }
  | {
      type: "string_contains";
      string: string;
    }
  | {
      type: "string_starts_with";
      string: string;
    }
  | {
      type: "string_ends_with";
      string: string;
    }
  | {
      type: "string_equals";
      string: string;
    }
  | {
      type: "number_change";
    }
  | {
      type: "number_equals";
      value: number;
    }
  | {
      type: "number_gt";
      value: number;
    }
  | {
      type: "number_lt";
      value: number;
    }
  | {
      type: "number_in_range";
      min: number;
      max: number;
    }
  | {
      type: "number_out_of_range";
      min: number;
      max: number;
    }
  | {
      type: "boolean_rising_edge";
    }
  | {
      type: "boolean_falling_edge";
    }
  | {
      type: "boolean_change";
    }
  | {
      type: "boolean_true";
    }
  | {
      type: "boolean_false";
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
