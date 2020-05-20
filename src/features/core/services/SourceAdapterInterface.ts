import { BaseAdapterInterface, SourceAdapterContext } from "../../..";

export interface SourceAdapterInterface extends BaseAdapterInterface {
  onContext(context: SourceAdapterContext);
}
