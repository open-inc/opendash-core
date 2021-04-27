import * as React from "react";

import styled from "styled-components";

import { Button } from "antd";
import { Icon } from "@opendash/icons";

import { Translate, equals, WidgetContext } from "../../..";

const Container = styled.div`
  width: 100%;
  height: 100%;

  padding: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;
`;

const IconHolder = styled.div`
  font-size: 2em;
`;

const Type = styled.div`
  font-weight: bold;
`;

const Message = styled.div`
  margin-bottom: 10px;
`;

export class WidgetErrorBoundary extends React.Component<
  {
    context: WidgetContext;
  },
  { error: Error }
> {
  state = { error: undefined };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidUpdate(prevProps) {
    if (
      this.state.error &&
      !equals(
        prevProps.context?.widget?.config,
        this.props.context?.widget?.config
      )
    ) {
      this.setState({ error: null });
    }
  }

  render() {
    if (this.state.error) {
      if (this.state.error.widget_config) {
        return (
          <Container>
            <div>
              <IconHolder>
                <Icon icon="fa:cog" />
              </IconHolder>
              <Type>
                <Translate t="opendash:monitoring.widgets.error.config" />
              </Type>
              <Message>
                <Translate t={this.state.error.message} />
              </Message>
              <Button
                type="primary"
                onClick={() => {
                  this.props.context.store.update((state) => {
                    state.settings = true;
                  });
                }}
              >
                <Translate t="opendash:widgets.settings" />
              </Button>
            </div>
          </Container>
        );
      }

      return (
        <Container>
          <div>
            <IconHolder>
              <Icon icon="fa:exclamation-circle" />
            </IconHolder>
            <Type>
              <Translate t="opendash:monitoring.widgets.error.default" />
            </Type>
            <Message>
              <Translate t="opendash:monitoring.widgets.error.default_desc" />
            </Message>
            <Button
              type="primary"
              onClick={(e) => {
                this.props.context.refresh();
              }}
            >
              <Translate t="opendash:widgets.reload" />
            </Button>
          </div>
        </Container>
      );
    }

    return this.props.children;
  }
}
