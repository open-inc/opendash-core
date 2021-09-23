import throttle from "lodash.throttle";

import {
  uuid,
  equals,
  MonitoringService,
  WidgetConfigInterface,
  WidgetInterface,
  WidgetTypeInterface,
  BaseService,
  produce,
} from "../../../..";

interface StateInterface<S, C> {
  id: string | undefined;
  widget: WidgetInterface | undefined;
  type: WidgetTypeInterface | undefined;

  widgetNotFound: boolean;

  key: string;
  name: string;
  loading: boolean;
  blocked: boolean;
  fullscreen: boolean;
  rename: boolean;
  delete: boolean;
  share: boolean;
  settings: boolean;
  unsaved: boolean;

  config: WidgetConfigInterface<C>;
  draft: WidgetConfigInterface<C>;
  savedConfig: WidgetConfigInterface<C>;
  state: S;

  width: number;
  height: number;
}

export class WidgetContext<C = any, S = any> extends BaseService<
  StateInterface<S, C>
> {
  private service: MonitoringService;

  public id: string | undefined;
  public widget: WidgetInterface | undefined;
  public type: WidgetTypeInterface | undefined;
  private container: HTMLDivElement | undefined;

  private containerHandleResize: () => void = throttle(() => {
    const container = this.container;

    if (container) {
      this.store.update((draft) => {
        draft.width = container.offsetWidth || 0;
        draft.height = container.offsetHeight || 0;
      });
    }
  }, 500);

  private containerObserver: ResizeObserver | undefined;

  constructor(service: MonitoringService, id?: string) {
    super({
      initialState: {
        id: undefined,
        widget: undefined,
        type: undefined,

        widgetNotFound: false,

        key: uuid(),
        name: undefined,
        loading: true,
        blocked: true,
        fullscreen: false,
        rename: false,
        delete: false,
        share: false,
        settings: false,
        unsaved: false,

        config: undefined,
        draft: undefined,
        savedConfig: undefined,
        state: undefined,

        width: 0,
        height: 0,
      },
    });

    this.service = service;
    this.id = id;

    if (id) {
      const widget = this.service.store.select((state) =>
        state.allWidgets.find((widget) => widget.id === id)
      );

      this.setWidget(widget);
    }

    if (typeof ResizeObserver === "function") {
      this.containerObserver = new ResizeObserver(this.containerHandleResize);
    } else {
      window.addEventListener("resize", this.containerHandleResize);

      // TODO:
      // window.removeEventListener("resize", this.containerHandleResize);
    }
  }

  public setWidget(widget: WidgetInterface) {
    this.widget = widget;

    if (this.widget) {
      this.type = this.service.types.find(
        (type) => this.widget.type === type.type
      );

      if (this.widget.config) {
        this.replaceDraft(this.widget.config);
      }

      if (this.widget.id) {
        // TODO: this needs to be removed, if the widget context is not used anymore or the widget gets deleted
        this.service.store.subscribeSelection(
          (state) =>
            state.allWidgets.find((widget) => widget.id === this.widget.id),
          (widget) => {
            if (widget?.config) {
              this.replaceDraft(widget.config);
            }
          }
        );
      }
    }
  }

  public get containerRef(): React.MutableRefObject<HTMLDivElement> {
    const self = this;

    return {
      get current() {
        return self.container;
      },
      set current(value) {
        self.setContainer(value);
      },
    };
  }

  public set containerRef(value: React.MutableRefObject<HTMLDivElement>) {
    this.setContainer(value.current);
  }

  public setName(name: string) {
    setTimeout(() => {
      if (!this.widget.name && this.store.getState().name !== name) {
        this.store.update((state) => {
          state.name = name;
        });
      }
    }, 0);
  }

  public setLoading(loading: boolean) {
    setTimeout(() => {
      if (this.store.getState().loading !== loading) {
        this.store.update((state) => {
          state.loading = loading;
        });
      }
    }, 0);
  }

  public async saveDraft() {
    if (this.id) {
      await this.service.updateWidget({
        ...this.widget,
        id: this.id,
        config: this.store.getState().draft,
      });
    }
  }

  public refresh() {
    this.store.update((state) => {
      state.key = uuid();
    });
  }

  updateDraft(
    f: (draft: WidgetConfigInterface<C>) => void | WidgetConfigInterface<C>
  ) {
    const draft = produce(
      this.store.getState().draft,
      f
    ) as WidgetConfigInterface<C>;

    const unsaved = !equals(this.widget.config, draft);

    this.store.update((x) => {
      x.unsaved = unsaved;
      x.draft = draft;
      x.config = draft;
    });
  }

  replaceDraft(replacement: WidgetConfigInterface<C>) {
    this.updateDraft((draft) => {
      return replacement;
    });
  }

  assignToDraft(objectToAssign: Partial<WidgetConfigInterface<C>>) {
    this.updateDraft((draft) => {
      Object.assign(draft, objectToAssign);
    });
  }

  private setContainer(container: HTMLDivElement) {
    if (this.container === container) {
      return;
    }

    if (this.container && this.containerObserver) {
      this.containerObserver.disconnect();
    }

    if (container && this.containerObserver) {
      this.containerObserver.observe(container);
    }

    this.container = container;

    this.containerHandleResize();
  }
}
