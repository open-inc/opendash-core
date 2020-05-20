import { UserInterface, SourceInterface } from "../../..";

export interface BaseAdapterInterface {
  onUser?(user: UserInterface): void;
  onSource?(source: SourceInterface, descendents: SourceInterface[]): void;
}
