import * as React from "react";

import { AuthPayloadInterface } from "../../..";

interface Props {
  onSubmit(payload: AuthPayloadInterface): void;
}

export type AuthFormComponentInterface = React.ComponentType<Props>;
