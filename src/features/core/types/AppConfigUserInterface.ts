import { FormElementInterface } from "../../..";

export interface AppConfigUserInterface {
  logoUrl: string;
  loginForm: FormElementInterface[];
  enableSignup: boolean;
  signupForm: FormElementInterface[];
}
