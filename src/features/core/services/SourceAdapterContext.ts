import { SourceInterface, SourceService, AppInterface } from "../../..";

export class SourceAdapterContext {
  private service: SourceService;
  private app: AppInterface;

  constructor(service: SourceService, app: AppInterface) {
    this.service = service;
    this.app = app;
  }

  setLoading(value: boolean): void {
    this.service.setLoading(value);
  }

  setSources(sources: Array<SourceInterface>) {
    this.app.state.update((draft) => {
      if (!sources || !Array.isArray(sources) || sources.length === 0) {
        draft.sources.all = [];
        draft.sources.current = null;
      } else {
        draft.sources.all = sources;

        const current = sources.find(
          (source) => source.id === draft.sources.current?.id
        );

        if (!draft.sources.current || !current) {
          draft.sources.current = sources[0];
        } else {
          draft.sources.current = current;
        }
      }
    });

    this.service.notifySubscribers();
  }

  updateSources(id: string, source: SourceInterface) {
    this.app.state.update((draft) => {
      if (draft.sources.current?.id === source.id) {
        Object.assign(draft.sources.current, source);
      }

      const draftSource = draft.sources.all.find((s) => s.id === source.id);

      if (draftSource) {
        Object.assign(draftSource, source);
      } else {
        draft.sources.all.push(source);
      }
    });

    this.service.notifySubscribers();
  }
}
