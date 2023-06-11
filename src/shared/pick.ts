const pick = <T extends object, k extends keyof T>(
  obj: T,
  keys: k[]
): Partial<T> => {
  const finObj: Partial<T> = {};
  for (const key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      finObj[key] = obj[key];
    }
  }

  return finObj;
};
export default pick;
