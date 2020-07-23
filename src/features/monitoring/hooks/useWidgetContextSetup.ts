import * as React from "react";

import {
  equals,
  useElementSize,
  useImmerState,
  useDataItems,
  WidgetContextInterface,
  WidgetBaseContextInterface,
  WidgetConfigError,
  useTranslation,
  DataItemInterface,
  useOpenDashServices,
  DataFetchingOptionsInterface,
  SourceInterface,
  useSource,
  useDataFetchValues,
  useDataFetchDimensionValues,
  useDeepCompareEffect,
  WidgetConfigInterface,
  useDeepCompareMemo,
} from "../../..";

export function useWidgetContextSetup(
  context: WidgetBaseContextInterface
): WidgetContextInterface {
  const t = useTranslation();
  const { DashboardService } = useOpenDashServices();

  const [draft, updateDraft, replaceDraft, assignToDraft] = useImmerState({});

  const config: WidgetConfigInterface = draft;
  const savedConfig = context?.widget.config;

  const unsaved: boolean = React.useMemo(() => !equals(draft, savedConfig), [
    draft,
    savedConfig,
  ]);

  useDeepCompareEffect(() => {
    if (context?.widget?.config && !equals(context?.widget?.config, draft)) {
      replaceDraft(context?.widget?.config);
    }
  }, [context?.widget?.config]);

  if (!context) {
    return null;
  }

  function saveDraft() {
    if (context.id) {
      DashboardService.updateWidget({
        ...context.widget,
        id: context.id,
        config: draft,
      });
    }
  }

  function setName(name: string) {
    if (!context.widget.name && context.state.name !== name) {
      context.setState({ name });
    }
  }

  function setLoading(loading: boolean) {
    if (context.state.loading !== loading) {
      context.setState({ loading });
    }
  }

  function useContainerSize(): {
    width: number;
    height: number;
  } {
    return useElementSize(context.container, 250);
  }

  function useSourceConfig(): SourceInterface[] {
    const type = context?.type.dataItems;
    const sourceConfig = config._sources;
    const [, , allSources] = useSource();

    if (!type) {
      throw new WidgetConfigError(t("opendash:error.data.sources_unsupported"));
    }

    if (type.select !== "source") {
      throw new WidgetConfigError(
        t("opendash:error.data.sources_dev_bad_config")
      );
    }

    if (!sourceConfig) {
      throw new WidgetConfigError(t("opendash:error.data.sources_notfound"));
    }

    if (sourceConfig.length > type.max) {
      throw new WidgetConfigError(t("opendash:error.data.sources_max"));
    }

    if (sourceConfig.length < type.min) {
      throw new WidgetConfigError(t("opendash:error.data.sources_min"));
    }

    const sources: SourceInterface[] = sourceConfig.map((id) =>
      allSources.find((source) => source.id === id)
    );

    for (const source of sources) {
      if (!source) {
        throw new WidgetConfigError(t("opendash:error.data.sources_missing"));
      }
    }

    return sources;
  }

  function useItemConfig(): DataItemInterface[] {
    const type = context?.type.dataItems;
    const itemConfig = config._items;
    const allItems = useDataItems();

    if (!type) {
      throw new WidgetConfigError(t("opendash:error.data.items_unsupported"));
    }

    if (type.select !== "item") {
      throw new WidgetConfigError(
        t("opendash:error.data.items_dev_bad_config")
      );
    }

    if (!itemConfig) {
      throw new WidgetConfigError(t("opendash:error.data.items_notfound"));
    }

    if (itemConfig.length > type.max) {
      throw new WidgetConfigError(t("opendash:error.data.items_max"));
    }

    if (itemConfig.length < type.min) {
      throw new WidgetConfigError(t("opendash:error.data.items_min"));
    }

    const items: DataItemInterface[] = React.useMemo(
      () =>
        itemConfig.map(([source, id]) =>
          allItems.find((item) => item.id === id && item.source === source)
        ),
      [allItems]
    );

    for (const item of items) {
      if (!item) {
        throw new WidgetConfigError(t("opendash:error.data.items_missing"));
      }
    }

    return items;
  }

  function useItemDimensionConfig(): [DataItemInterface, number][] {
    const type = context?.type.dataItems;
    const dimensionConfig = config._dimensions;
    const allItems = useDataItems();

    if (!type) {
      throw new WidgetConfigError(t("opendash:error.data.items_unsupported"));
    }

    if (type.select !== "dimension") {
      throw new WidgetConfigError(
        t("opendash:error.data.items_dev_bad_config")
      );
    }

    if (!dimensionConfig) {
      throw new WidgetConfigError(t("opendash:error.data.items_notfound"));
    }

    if (dimensionConfig.length > type.max) {
      throw new WidgetConfigError(t("opendash:error.data.items_max"));
    }

    if (dimensionConfig.length < type.min) {
      throw new WidgetConfigError(t("opendash:error.data.items_min"));
    }

    const items: [DataItemInterface, number][] = React.useMemo(
      () =>
        dimensionConfig.map(([source, id, dimension]) => [
          allItems.find((item) => item.id === id && item.source === source),
          dimension,
        ]),
      [allItems]
    );

    for (const [item, dimension] of items) {
      if (!item) {
        throw new WidgetConfigError(t("opendash:error.data.items_missing"));
      }

      if (!type.types.includes(item.valueTypes[dimension].type)) {
        throw new WidgetConfigError(t("opendash:error.data.items_type"));
      }
    }

    return items;
  }

  function useFetchValues(overwriteOptions, mapper, onLiveValues) {
    const items = useItemConfig();
    const fetchConfig = useFetchConfig(overwriteOptions);

    return useDataFetchValues(items, fetchConfig, mapper, onLiveValues);
  }

  function useFetchDimensionValues(overwriteOptions, mapper, onLiveValues) {
    const items = useItemDimensionConfig();
    const fetchConfig = useFetchConfig(overwriteOptions);

    return useDataFetchDimensionValues(
      items,
      fetchConfig,
      mapper,
      onLiveValues
    );
  }

  function useFetchConfig(
    overwriteConfig: DataFetchingOptionsInterface
  ): DataFetchingOptionsInterface {
    const type = context?.type.dataFetching;
    const userConfig = config._history;

    if (!type) {
      throw new WidgetConfigError(t("opendash:error.data.history_unsupported"));
    }

    if (!userConfig) {
      throw new WidgetConfigError(t("opendash:error.data.history_notfound"));
    }

    return useDeepCompareMemo(
      () => ({
        ...userConfig,
        ...(overwriteConfig || {}),
      }),
      [userConfig, overwriteConfig]
    );
  }

  return {
    config,
    savedConfig,
    unsaved,
    draft,
    updateDraft,
    replaceDraft,
    assignToDraft,
    saveDraft,
    setName,
    setLoading,
    useContainerSize,
    useSourceConfig,
    useItemConfig,
    useItemDimensionConfig,
    useFetchConfig,
    useFetchValues,
    useFetchDimensionValues,
  };
}
