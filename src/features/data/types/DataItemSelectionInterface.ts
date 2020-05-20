export interface DataItemSelectionInterface {
  select: "source" | "item" | "dimension";
  min?: number;
  max?: number;
  types: ("Number" | "String" | "Boolean" | "Geo" | "Object")[];
}
