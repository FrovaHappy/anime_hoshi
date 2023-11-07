export default function remove<T>(obj: any): T {
  return Object.fromEntries(Object.entries(obj).filter(([_key, val]) => val)) as T
}
