import {
  DataService,
  DataItemInterface,
  DataItemValueInterface,
  AppInterface,
} from "../../..";

export class DataAdapterContext {
  private service: DataService;

  constructor(service: DataService, app: AppInterface) {
    this.service = service;
  }

  setLoading(value: boolean): void {
    this.service.setLoading(value);
  }

  async setItem(item: DataItemInterface): Promise<void> {
    await this.service.setItem(item);
  }

  async setItems(items: DataItemInterface[]): Promise<void> {
    await this.service.setItems(items);
  }

  async setValue(
    item: DataItemInterface,
    value: DataItemValueInterface
  ): Promise<void> {
    await this.service.setValue(item, value);
  }

  async removeItem(item: DataItemInterface): Promise<void> {
    await this.service.removeItem(item);
  }

  async clearItems(): Promise<void> {
    await this.service.clear();
  }

  async reset(): Promise<void> {
    await this.service.setLoading(true);

    await this.service.clear();
  }
}
