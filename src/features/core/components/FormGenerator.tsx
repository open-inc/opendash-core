import * as React from "react";
import Schema from "async-validator";

import { Form } from "@ant-design/compatible";
// import "@ant-design/compatible/assets/index.css";

import { Input, Select, Switch, Button, Checkbox, InputNumber } from "antd";
import { ButtonProps } from "antd/lib/button";

import {
  useTranslation,
  useObjectState,
  DataItemHistoryOptionsPicker,
  DataItemPicker,
  DataItemValuePicker,
  FormElementInterface,
} from "../../..";

// Avoid warnings from the validator in the console
// @ts-ignore
Schema.warning = () => {};

interface Props {
  // style: React.CSSProperties;

  state?: Record<string, any>;
  updateState?: (key: string, value: any) => void;
  onChange?: (state: Record<string, any>) => void;
  onSubmit?: (state: Record<string, any>) => void;
  submit?: ButtonProps;
  settings?: {
    layout?: "horizontal" | "vertical" | "inline";
    removeHidden?: boolean;
  };
  elements: FormElementInterface[];
}

export const FormGenerator: React.FC<Props> = ({
  elements,
  state: externalState,
  updateState: externalUpdateState,
  onChange,
  submit: submitOptions,
  onSubmit,
  settings,
  children,
}) => {
  const [t] = useTranslation(["opendash"]);
  const firstRunRef = React.useRef(true);

  const [internalState, internalUpdateState] = useObjectState({});
  const [errorState, setErrorState] = React.useState({});

  const [dirtyState, setDirtyState] = useObjectState({});

  const schema = React.useMemo(() => {
    return new Schema(
      Object.fromEntries(
        elements
          .filter((field) => field.rules)
          .map((field) => [field.key, field.rules])
      )
    );
  }, elements);

  const hasExternalState = externalState && externalUpdateState;

  const state = hasExternalState ? externalState : internalState;
  const updateStateHandler = hasExternalState
    ? externalUpdateState
    : (key: string, value: string) => {
        internalUpdateState({ [key]: value });
      };

  React.useEffect(() => {
    if (!firstRunRef.current) {
      if (onChange) {
        onChange(state);
      }

      // @ts-ignore
      schema.validate(state, {}, (errors) => {
        if (errors) {
          setErrorState(
            Object.fromEntries(
              errors.map((error) => [error.field, error.message])
            )
          );
        } else {
          setErrorState({});
        }
      });
    }

    firstRunRef.current = false;
  }, [externalState, internalState]);

  const visibleElements = elements.filter((field) => {
    if (field.visible === false) {
      return false;
    } else if (typeof field.visible === "function") {
      return field.visible(state);
    } else {
      return true;
    }
  });

  const invisibleElements = elements.filter((field) => {
    if (field.visible === true) {
      return true;
    } else if (typeof field.visible === "function") {
      return !field.visible(state);
    } else {
      return false;
    }
  });

  React.useEffect(() => {
    for (const field of visibleElements) {
      if (field.key in state === false || state[field.key] === undefined) {
        updateStateHandler(field.key, field.defaultValue);
      }
    }

    if (settings.removeHidden) {
      for (const field of invisibleElements) {
        if (field.key in state === true && state[field.key] !== undefined) {
          updateStateHandler(field.key, undefined);
        }
      }
    }
  }, [state]);

  const updateState = (key: string, value: string) => {
    updateStateHandler(key, value);

    if (!dirtyState[key]) {
      setDirtyState({ [key]: true });
    }
  };

  const layout = settings && settings.layout ? settings.layout : "vertical";

  return (
    // <div style={{ padding: 20 }}>
    <div>
      <Form
        layout={layout}
        onSubmit={(event) => {
          event.preventDefault();

          if (onSubmit && !Object.values(errorState).some((e) => e)) {
            onSubmit(state);
          }
        }}
      >
        <div>
          {visibleElements.map((field) => {
            return (
              <Form.Item
                key={field.key}
                label={t(field.label)}
                // hasFeedback
                validateStatus={
                  dirtyState[field.key]
                    ? errorState[field.key]
                      ? "error"
                      : "success"
                    : undefined
                }
                help={
                  dirtyState[field.key] && errorState[field.key]
                    ? errorState[field.key]
                    : ""
                }
              >
                <FormGeneratorField
                  field={field}
                  value={state[field.key]}
                  setValue={(v) => {
                    updateState(field.key, v);
                  }}
                />
              </Form.Item>
            );
          })}
        </div>
        {children && <div>{children}</div>}
        {submitOptions && (
          <div>
            <Button
              type="primary"
              htmlType="submit"
              disabled={Object.values(errorState).some((e) => e)}
              {...(submitOptions || {})}
            />
          </div>
        )}
      </Form>
    </div>
  );
};

interface FieldProps {
  field: FormElementInterface;
  value: any;
  setValue: (value: any) => void;
}

const FormGeneratorField: React.FC<FieldProps> = ({
  field,
  value,
  setValue,
}) => {
  const [t] = useTranslation(["opendash"]);

  switch (field.type) {
    case "input":
      return (
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type={field.settings?.type || "text"}
          placeholder={field.settings?.placeholder || void 0}
          prefix={field.settings?.prefix || void 0}
          style={field.style}
        ></Input>
      );

    case "input.number":
      return (
        <InputNumber
          value={value}
          onChange={(nextValue) => setValue(nextValue)}
          style={field.style}
          {...field.settings}
        />
      );

    case "input.password":
      return (
        <Input.Password
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={field.settings?.placeholder || void 0}
          prefix={field.settings?.prefix || void 0}
          style={field.style}
        />
      );

    case "switch":
      return (
        <Switch
          checked={value}
          onChange={(nextValue: boolean) => {
            setValue(nextValue);
          }}
          style={field.style}
        />
      );

    case "checkbox":
      return (
        <Checkbox
          checked={value}
          onChange={(e) => {
            setValue(e.target.checked);
          }}
          style={field.style}
        ></Checkbox>
      );

    case "textarea":
      return (
        <Input.TextArea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={field.settings?.rows || 4}
          style={field.style}
        ></Input.TextArea>
      );

    case "select":
      return (
        <Select
          value={value}
          onChange={(v) => {
            setValue(v);
          }}
          style={field.style}
        >
          {field.settings?.options.map((option) => {
            return (
              <Select.Option key={option.value} value={option.value}>
                {t(option.label)}
              </Select.Option>
            );
          })}
        </Select>
      );

    case "select-item":
      return (
        <DataItemPicker
          value={value}
          onChange={(v) => setValue(v)}
          style={field.style}
        ></DataItemPicker>
      );

    case "select-item-dimension":
      return (
        <DataItemValuePicker
          value={value}
          onChange={(v) => setValue(v)}
          style={field.style}
        ></DataItemValuePicker>
      );

    case "select-date":
      return (
        <DataItemHistoryOptionsPicker
          value={value}
          onChange={(v) => setValue(v)}
          style={field.style}
        ></DataItemHistoryOptionsPicker>
      );

    default:
      console.warn(`FormGenerator: Type '${field.type}' does not exist.`);
      return null;
  }
};
