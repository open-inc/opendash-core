export interface DataItemDimensionSelectionInterface {
  select: "dimension";
  min?: number;
  max?: number;
  types?: ("Number" | "String" | "Boolean" | "Geo" | "Object")[];
}
