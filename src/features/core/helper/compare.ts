// based on https://github.com/lodash/lodash/blob/4.17.11/lodash.js
export function compare(mapper, desc = false) {
  return (a, b) => {
    if (mapper) {
      a = mapper(a);
      b = mapper(b);
    }
    if (a !== b) {
      const aIsDefined = a !== undefined;
      const aIsNull = a === null;
      const aIsReflexive = a === a;
      const aIsSymbol = false; // isSymbol(a);

      const bIsDefined = b !== undefined;
      const bIsNull = b === null;
      const bIsReflexive = b === b;
      const bIsSymbol = false; // isSymbol(b);

      if (
        (!bIsNull && !bIsSymbol && !aIsSymbol && a > b) ||
        (aIsSymbol && bIsDefined && bIsReflexive && !bIsNull && !bIsSymbol) ||
        (aIsNull && bIsDefined && bIsReflexive) ||
        (!aIsDefined && bIsReflexive) ||
        !aIsReflexive
      ) {
        return desc ? -1 : 1;
      }

      if (
        (!aIsNull && !aIsSymbol && !bIsSymbol && a < b) ||
        (bIsSymbol && aIsDefined && aIsReflexive && !aIsNull && !aIsSymbol) ||
        (bIsNull && aIsDefined && aIsReflexive) ||
        (!bIsDefined && aIsReflexive) ||
        !bIsReflexive
      ) {
        return desc ? 1 : -1;
      }
    }
    return 0;
  };
}
