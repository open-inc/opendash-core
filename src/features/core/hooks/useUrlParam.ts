import * as React from "react";
import { equals, useHref } from "../../..";
import { useNavigate } from "react-router-dom";
import rison from "rison";

type serialisationType = "string" | "object" | "array" | "json" | "any";

export function useUrlParam<T>(
  param: string,
  defaultValue: T,
  type: serialisationType = "any"
): [T, (nextValue: T) => void] {
  const href = useHref();
  const navigate = useNavigate();

  const [state, setState] = React.useState(
    getParam(href, param, type) || defaultValue
  );

  React.useEffect(() => {
    setState(getParam(href, param, type) || defaultValue);
  }, [href, param]);

  const updateParam = React.useCallback(
    (nextValue) => {
      setParam(navigate, href, param, nextValue, defaultValue, type);
    },
    [href, param]
  );

  return React.useMemo(() => [state, updateParam], [state, updateParam]);
}

function getParam(href: string, param: string, type: serialisationType) {
  const url = new URL(href);

  const value = url.searchParams.get(param);

  if (!value) {
    return null;
  }

  return decode(value, type);
}

function setParam<T>(
  navigate,
  href: string,
  param: string,
  value: T,
  defaultValue: T,
  type: serialisationType
) {
  const current = window.location.search;

  const next =
    !value || equals(value, defaultValue)
      ? updateQueryString(current, param, undefined)
      : updateQueryString(current, param, encode(value, type));

  if (!equals(current, next)) {
    navigate(next || "?");
  }
}

function decode(value, type: serialisationType) {
  switch (type) {
    case "string":
      return value;
    case "object":
      return rison.decode_object(JSON.parse(JSON.stringify(value)));
    case "array":
      return rison.decode_array(JSON.parse(JSON.stringify(value)));
    case "json":
      return JSON.parse(value);
    case "any":
    default:
      return rison.decode(JSON.parse(JSON.stringify(value)));
  }
}

function encode(value, type: serialisationType) {
  switch (type) {
    case "string":
      return value;
    case "object":
      return rison.encode_object(JSON.parse(JSON.stringify(value)));
    case "array":
      return rison.encode_array(JSON.parse(JSON.stringify(value)));
    case "json":
      return encodeURIComponent(JSON.stringify(value));
    case "any":
    default:
      return rison.encode(JSON.parse(JSON.stringify(value)));
  }
}

function updateQueryString(current, key, value) {
  const re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi");

  let hash;

  if (re.test(current)) {
    if (typeof value !== "undefined" && value !== null)
      return current.replace(re, "$1" + key + "=" + value + "$2$3");
    else {
      hash = current.split("#");
      current = hash[0].replace(re, "$1$3").replace(/(&|\?)$/, "");
      if (typeof hash[1] !== "undefined" && hash[1] !== null)
        current += "#" + hash[1];
      return current;
    }
  } else {
    if (typeof value !== "undefined" && value !== null) {
      const separator = current.indexOf("?") !== -1 ? "&" : "?";
      hash = current.split("#");
      current = hash[0] + separator + key + "=" + value;
      if (typeof hash[1] !== "undefined" && hash[1] !== null)
        current += "#" + hash[1];
      return current;
    } else return current;
  }
}
