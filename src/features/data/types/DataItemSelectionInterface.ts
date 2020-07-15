export type DataItemSelectionInterface =
  | {
      select: "source";
      min?: number;
      max?: number;
    }
  | {
      select: "item";
      min?: number;
      max?: number;
    }
  | {
      select: "dimension";
      min?: number;
      max?: number;
      types?: ("Number" | "String" | "Boolean" | "Geo" | "Object")[];
    };
