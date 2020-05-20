import {
  BaseAdapterInterface,
  UserAdapterContext,
  AuthPayloadInterface,
} from "../../..";

export interface UserAdapterInterface extends BaseAdapterInterface {
  onContext(context: UserAdapterContext);

  login(payload: AuthPayloadInterface): Promise<void>;
  register(payload: AuthPayloadInterface): Promise<void>;
  logout(): Promise<void>;

  // TODO
  // getAcl(type: string, id: string): Promise<CollectionAclInterface>;
  // setAcl(type: string, id: string, acl: CollectionAclInterface): Promise<void>;
}
