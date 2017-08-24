export function getOption<T, K extends keyof T>(
  options: Partial<T> | undefined,
  key: K,
  defaultValue: T[K]
): T[K] {
  const value = options && options[key];

  return value !== undefined ? value : defaultValue;
}
