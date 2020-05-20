import { AppFactory, AppInterface, render } from "../../..";

export async function init(
  id: string = "opendash",
  factoryCallback: (factory: AppFactory) => Promise<void> | void
): Promise<AppInterface> {
  const factory = new AppFactory(id);

  await Promise.resolve(factoryCallback(factory));

  const app = factory.createApp();

  // @ts-ignore
  window.app = app; // TODO: remove this line

  if (document.getElementById(id)) {
    render(app, document.getElementById(id));
  } else {
    document.addEventListener("DOMContentLoaded", () => {
      render(app, document.getElementById(id));
    });
  }

  return app;
}
