// from https://github.com/lukeed/dequal

export function equals(a: any, b: any): boolean {
  let constructor, len;

  if (a === b) {
    return true;
  }

  if (a && b && (constructor = a.constructor) === b.constructor) {
    if (constructor === Date) {
      return a.getTime() === b.getTime();
    }

    if (constructor === RegExp) {
      return a.toString() === b.toString();
    }

    if (constructor === Array && (len = a.length) === b.length) {
      while (len-- && equals(a[len], b[len]));
      return len === -1;
    }

    if (constructor === Object) {
      if (Object.keys(a).length !== Object.keys(b).length) return false;
      for (len in a) {
        if (!(len in b) || !equals(a[len], b[len])) {
          return false;
        }
      }
      return true;
    }
  }

  return a !== a && b !== b;
}
