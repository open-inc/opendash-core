import * as React from "react";

import { Container, Box, Background, Title, SwitchState } from "./layout";
import { Alert, Button } from "antd";

import {
  useUrlParam,
  useTranslation,
  useOpenDashApp,
  useOpenDashServices,
} from "../../../..";

export default function OpenDashAuth() {
  const t = useTranslation();
  const [state, setState] = useUrlParam("action", "login", "string");
  const [error, setError] = React.useState();
  const app = useOpenDashApp();
  const { UserService } = useOpenDashServices();

  const LoginForm = app.ui.authLoginForm;
  const SignupForm = app.ui.authSignupForm;

  React.useEffect(() => {
    if (!["login", "signup"].includes(state)) {
      setState("login");
    }
  }, [state]);

  return (
    <Container>
      {state === "login" && (
        <Box>
          <Title>{t("opendash:auth.login_title")}</Title>
          {error && (
            <Alert
              type="error"
              message={t("opendash:auth.login_failed")}
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
              {t("opendash:auth.switch_to_signup")}
            </Button>
          </SwitchState>
        </Box>
      )}

      {state === "signup" && (
        <Box>
          <Title>{t("opendash:auth.signup_title")}</Title>
          {error && (
            <Alert
              type="error"
              message={t("opendash:auth.signup_failed")}
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
              {t("opendash:auth.switch_to_login")}
            </Button>
          </SwitchState>
        </Box>
      )}

      <Background />
    </Container>
  );
}
