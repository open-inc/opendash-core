export interface AuthPayloadInterface {
  name?: string;
  email?: string;
  username?: string;
  password?: string;
  [key: string]: any;
}
