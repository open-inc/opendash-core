export class WidgetConfigError extends Error {
  widget_config: boolean = true;

  constructor(message) {
    super(message);
  }
}
