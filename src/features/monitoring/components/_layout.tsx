import * as React from "react";

import styled from "styled-components";

import { Button } from "antd";

const Container = styled.div`
  width: 100%;
  height: 100%;

  padding: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;
`;

const Icon = styled.div`
  font-size: 2em;
`;

const Type = styled.div`
  font-weight: bold;
`;

const Message = styled.div`
  margin-bottom: 10px;
`;

interface ErrorMessageProps {
  icon: string | React.ReactNode;
  title: string | React.ReactNode;
  message: string | React.ReactNode;
  actionLabel: string | React.ReactNode;
  actionClick: () => void;
}

export const ErrorMessage = React.forwardRef<unknown, ErrorMessageProps>(
  ({ icon, title, message, actionLabel, actionClick }, ref) => {
    return (
      <Container ref={ref}>
        <div>
          {icon && <Icon>{icon}</Icon>}
          {title && <Type>{title}</Type>}
          {message && <Message>{message}</Message>}
          <Button type="primary" onClick={actionClick}>
            {actionLabel}
          </Button>
        </div>
      </Container>
    );
  }
);
