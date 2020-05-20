export class AppFactoryLockedError extends Error {
  constructor(method) {
    super(
      `You can not call AppFactory."${method}"() when the factory is allready locked.`
    );
  }
}
