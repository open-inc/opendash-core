// type TranslationInterface =
//   | Record<string, string>
//   | Record<string, TranslationInterface>;

type TranslationInterface = Record<string, any>;

export type TranslationResolverInterface = () => Promise<TranslationInterface>;
