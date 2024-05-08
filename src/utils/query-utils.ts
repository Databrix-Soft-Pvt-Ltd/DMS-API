interface FilterObject {
  [key: string]: string | number | boolean | unknown | FilterObject;
}

export const parseFilter = (filter?: unknown): FilterObject => {
  if (!filter) {
    return {};
  }

  const newFilter: FilterObject = {};

  if (typeof filter !== 'object') {
    // Handle cases where filter is not an object (optional)
    return newFilter;
  }

  Object.entries(filter as Record<string, unknown>).forEach(([key, value]) => {
    if (typeof value === 'object') {
      const nestedFilter: FilterObject = {};
      Object.entries(value as Record<string, unknown>).forEach(([nestedKey, nestedValue]) => {
        nestedFilter[`$${nestedKey}`] = nestedValue;
      });
      newFilter[key] = nestedFilter;
    } else {
      newFilter[key] = value as string | number | boolean;
    }
  });

  return newFilter;
};
