import * as React from "react";

import { Container, Box, Background, Title, SwitchState } from "./layout";
import { Alert, Button } from "antd";

import { useTranslation, useOpenDashServices } from "../../../..";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

export default function OpenDashAuth() {
  const [t] = useTranslation(["opendash"]);
  const [state, setState] = React.useState("login");
  const [error, setError] = React.useState();
  const { UserService } = useOpenDashServices();

  return (
    <Container>
      {state === "login" && (
        <Box>
          <Title>{t("auth.login_title")}</Title>
          {error && (
            <Alert
              type="error"
              message={t("auth.login_failed")}
              style={{ marginBottom: 10 }}
            />
          )}
          <LoginForm
            // @ts-ignore
            onSubmit={(data) =>
              UserService.login(data).then(
                (user) => {
                  setError(undefined);
                },
                (error) => {
                  console.error(error);
                  setError(error);
                }
              )
            }
          />
          <SwitchState>
            <Button type="link" onClick={(e) => setState("signup")}>
              {t("auth.switch_to_signup")}
            </Button>
          </SwitchState>
        </Box>
      )}

      {state === "signup" && (
        <Box>
          <Title>{t("auth.signup_title")}</Title>
          {error && (
            <Alert
              type="error"
              message={t("auth.signup_failed")}
              style={{ marginBottom: 10 }}
            />
          )}
          <SignupForm
            // @ts-ignore
            onSubmit={(data) => {
              UserService.register(data).then(
                (user) => {
                  setError(undefined);
                },
                (error) => {
                  console.error(error);
                  setError(error);
                }
              );
            }}
          />
          <SwitchState>
            <Button type="link" onClick={(e) => setState("login")}>
              {t("auth.switch_to_login")}
            </Button>
          </SwitchState>
        </Box>
      )}

      <Background />
    </Container>
  );
}
