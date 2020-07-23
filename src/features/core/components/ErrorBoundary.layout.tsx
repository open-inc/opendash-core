import * as React from "react";

import styled from "styled-components";

import { useTranslation } from "../../..";
import { Button, Divider } from "antd";

const Container = styled.div`
  padding: 24px;
`;

const Message = styled.div``;

const Actions = styled.div`
  & > button {
    margin-right: 24px;
  }
`;

export const ErrorLayout: React.FC<{ reset: (goHome: boolean) => void }> = ({
  children,
  reset,
}) => {
  const t = useTranslation();

  return (
    <Container>
      <Message>{children}</Message>
      <Divider />
      <Actions>
        <Button
          type="primary"
          children={t("opendash:error.reload")}
          onClick={(e) => {
            reset(false);
          }}
        />
        <Button
          children={t("opendash:error.reset")}
          onClick={(e) => {
            reset(true);
          }}
        />
      </Actions>
    </Container>
  );
};
