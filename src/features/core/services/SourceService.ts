import {
  AppInterface,
  BaseService,
  SourceAdapterInterface,
  SourceAdapterContext,
  SourceInterface,
} from "../../..";

export class SourceService extends BaseService {
  private app: AppInterface;
  private adapter: SourceAdapterInterface;
  private context: SourceAdapterContext;

  constructor(app: AppInterface, adapter: SourceAdapterInterface) {
    super();

    this.app = app;
    this.adapter = adapter;
    this.context = new SourceAdapterContext(this, this.app);

    this.initAdapter(adapter, this.context, app.services);
  }

  getCurrent(): SourceInterface {
    return this.app.state.select((state) => state.sources.current);
  }

  getChildren(source: SourceInterface): SourceInterface[] {
    return this.app.state.select((state) =>
      state.sources.all.filter((s) => s.parent === source.id)
    );
  }

  getDescendents(rootSource: SourceInterface): SourceInterface[] {
    const descendentsIds = this._getDescendentsIds(rootSource);

    return this.getAll().filter((source) => descendentsIds.includes(source.id));
  }

  _getDescendentsIds(rootSource: SourceInterface): string[] {
    let all = this.getAll()
      .filter((source) => source.parent && source.id !== rootSource.id)
      .map((source) => [source.id, source.parent]);

    let descendents: string[] = [];
    let added: string[] = [rootSource.id];
    let lastAdded: string[] = [];

    while (true) {
      lastAdded = added;
      added = [];

      for (const addedSourceId of lastAdded) {
        for (const [id, parent] of all) {
          if (parent === addedSourceId) {
            added.push(id);
          }
        }
      }

      if (added.length > 0) {
        descendents.push(...added);
        all = all.filter(([id]) => !added.includes(id));
      } else {
        break;
      }
    }

    return descendents;
  }

  getAll(): SourceInterface[] {
    return this.app.state.select((state) => state.sources.all);
  }

  setCurrent(id: string) {
    this.app.state.update((draft) => {
      draft.sources.current = draft.sources.all.find(
        (source) => source.id === id
      );
    });

    this.notifySubscribers();
  }
}
