import * as React from "react";
import Schema from "async-validator";

import {
  Form,
  Input,
  Select,
  Switch,
  Button,
  Checkbox,
  InputNumber,
} from "antd";

import { Icon } from "@opendash/icons";
import { ButtonProps } from "antd/lib/button";

import {
  useTranslation,
  DataItemHistoryOptionsPicker,
  DataItemValuePicker,
  FormElementInterface,
  produce,
} from "../../..";

type NamePath = string | number | (string | number)[];

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
    hideLabels?: boolean;
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
  const t = useTranslation();

  const firstRunRef = React.useRef(true);
  const dirtyRef = React.useRef({});

  const [internalState, setInternalState] = React.useState({});
  const [errorState, setErrorState] = React.useState({});

  const schema = React.useMemo(() => {
    return new Schema(
      Object.fromEntries(
        elements
          .filter((field) => field.rules)
          .map((field) => [field.key, field.rules])
      )
    );
  }, [elements]);

  const hasExternalState = externalState && externalUpdateState;

  const state = hasExternalState ? externalState : internalState;

  const updateStateHandler = React.useCallback(
    (key: string, name: NamePath, value) => {
      name = name || key;
      const nextState = produce(state, (draft) => {
        setSelector(draft, name, value);
      });

      if (hasExternalState) {
        const x = (Array.isArray(name) ? name[0] : name).toString();

        externalUpdateState(x, nextState[x]);
      } else {
        setInternalState(nextState);
      }

      if (!dirtyRef.current[key]) {
        dirtyRef.current[key] = true;
      }
    },
    [state, hasExternalState, externalUpdateState]
  );

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

    for (const field of visibleElements) {
      if (
        field.defaultValue !== undefined &&
        (field.key in state === false || state[field.key] === undefined)
      ) {
        updateStateHandler(field.key, field.name, field.defaultValue);
      }
    }

    if (settings?.removeHidden) {
      for (const field of invisibleElements) {
        if (field.key in state === true && state[field.key] !== undefined) {
          updateStateHandler(field.key, field.name, undefined);
        }
      }
    }
  }, [state]);

  const layout = settings?.layout ? settings.layout : "vertical";

  return (
    <Form
      layout={layout}
      onFinish={() => {
        if (onSubmit && !Object.values(errorState).some((e) => e)) {
          onSubmit(state);
        }
      }}
    >
      {visibleElements.map((field) => {
        return (
          <Form.Item
            key={field.key}
            label={!settings?.hideLabels && t(field.label)}
            // hasFeedback
            validateStatus={
              dirtyRef.current[field.key]
                ? errorState[field.key]
                  ? "error"
                  : "success"
                : undefined
            }
            help={
              dirtyRef.current[field.key] && errorState[field.key]
                ? errorState[field.key]
                : field.description
                ? field.description
                : undefined
            }
            tooltip={field.hint}
          >
            <FormGeneratorField
              field={field}
              value={getSelector(state, field.name || field.key)}
              setValue={(v) => {
                updateStateHandler(field.key, field.name, v);
              }}
            />
          </Form.Item>
        );
      })}

      {children && { children }}

      {submitOptions && (
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={Object.values(errorState).some((e) => e)}
            {...(submitOptions || {})}
          />
        </Form.Item>
      )}

      {!submitOptions && (
        <div style={{ display: "hidden" }}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={Object.values(errorState).some((e) => e)}
          />
        </div>
      )}
    </Form>
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
  const t = useTranslation();

  if (field.type === "input") {
    const { prefixIcon, ...settings } = field.settings || {};

    if (prefixIcon) {
      settings.prefix = (
        <Icon icon={prefixIcon} style={{ color: "rgba(0,0,0,.25)" }} />
      );
    }

    return (
      <Input
        {...settings}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type={settings.type || "text"}
        style={field.style}
      />
    );
  }

  if (field.type === "input.tags") {
    const seperator = field.settings?.seperator || ",";

    return (
      <Select
        mode="tags"
        tokenSeparators={[seperator]}
        value={value ? value.split(seperator) : []}
        onChange={(nextValue: string[]) => setValue(nextValue.join(seperator))}
        style={field.style}
        notFoundContent={null}
      />
    );
  }

  if (field.type === "input.password") {
    const { prefixIcon, ...settings } = field.settings || {};

    if (prefixIcon) {
      settings.prefix = (
        <Icon icon={prefixIcon} style={{ color: "rgba(0,0,0,.25)" }} />
      );
    }

    return (
      <Input.Password
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={field.settings?.placeholder || void 0}
        prefix={field.settings?.prefix || null}
        style={field.style}
      />
    );
  }

  if (field.type === "input.number") {
    return (
      <InputNumber
        value={value}
        onChange={(nextValue) => setValue(nextValue)}
        style={field.style}
        {...field.settings}
      />
    );
  }

  if (field.type === "switch") {
    return (
      <Switch
        checked={value}
        onChange={(nextValue: boolean) => {
          setValue(nextValue);
        }}
        style={field.style}
      />
    );
  }

  if (field.type === "checkbox") {
    return (
      <Checkbox
        checked={value}
        onChange={(e) => {
          setValue(e.target.checked);
        }}
        style={field.style}
      />
    );
  }

  if (field.type === "textarea") {
    return (
      <Input.TextArea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={field.settings?.rows || 4}
        style={field.style}
      />
    );
  }

  if (field.type === "select") {
    return (
      <Select
        placeholder={field.settings?.placeholder}
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
  }

  // if (field.type === "select-item") {
  // return (
  //   <DataItemPicker
  //     value={value}
  //     onChange={(v) => setValue(v)}
  //     style={field.style}
  //   />
  // );
  // }

  if (field.type === "select-item-dimension" || field.type === "select-item") {
    return (
      <DataItemValuePicker
        value={value}
        onChange={(v) => setValue(v)}
        style={field.style}
      />
    );
  }

  if (field.type === "select-date") {
    return (
      <DataItemHistoryOptionsPicker
        value={value}
        onChange={(v) => setValue(v)}
        style={field.style}
      />
    );
  }

  console.warn(`FormGenerator: Type '${field.type}' does not exist.`);
  return null;
};

function getSelector(obj: any, path: NamePath) {
  try {
    let value = obj;

    if (Array.isArray(path)) {
      for (const key of path) {
        value = value[key];
      }
    } else {
      value = value[path];
    }

    return value;
  } catch (error) {
    return null;
  }
}

function setSelector(obj: any, path: NamePath, value: any) {
  try {
    if (!Array.isArray(path)) {
      obj[path] = value;

      return true;
    }

    if (path.length === 1) {
      return setSelector(obj, path[0], value);
    }

    const [key, nextKey, ...remainingSelector] = path;

    if (!(key in obj)) {
      if (Number.isInteger(nextKey)) {
        obj[key] = [];
      } else {
        obj[key] = {};
      }
    }

    return setSelector(obj[key], [nextKey, ...remainingSelector], value);
  } catch (error) {
    return false;
  }
}
