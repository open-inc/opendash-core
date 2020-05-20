import {
  SourceIdentifierInterface,
  DataItemIdentifierInterface,
  DataItemDimensionIdentifierInterface,
  DataFetchingOptionsInterface,
} from "../../..";

export type WidgetConfigInterface<T = any> = T & {
  _sources?: SourceIdentifierInterface[];
  _items?: DataItemIdentifierInterface[];
  _dimensions?: DataItemDimensionIdentifierInterface[];
  _history?: DataFetchingOptionsInterface;
};
