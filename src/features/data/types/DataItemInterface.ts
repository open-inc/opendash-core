import { DataItemValueTypeInterface } from "../../..";

export interface DataItemInterface {
  id: string;
  name: string;
  source: string;
  meta: Record<string, any>;
  valueTypes: DataItemValueTypeInterface[];
}
