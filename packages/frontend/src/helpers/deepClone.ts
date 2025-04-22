export function deepClone<T>(obj: T): T {
  // Return non-object values as is
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Return Array cloning
  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item)) as T;
  }

  // Cloning if it is obj
  const clonedObj: Record<string, unknown> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clonedObj[key] = deepClone(obj[key]);
    }
  }
  return clonedObj as T;
}
