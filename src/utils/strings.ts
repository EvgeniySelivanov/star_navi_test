type AnyObject = { [key: string]: any };

export const toCamelCase = (obj: AnyObject | any[]): AnyObject | any[] => {
  if (Array.isArray(obj)) {
    return obj.map(v => toCamelCase(v));
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      (acc as AnyObject)[camelCaseKey] = toCamelCase(obj[key]);
      return acc;
    }, {} as AnyObject); // Приведение начального значения к AnyObject
  }
  return obj;
};
