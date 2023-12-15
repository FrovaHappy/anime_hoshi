/**
 * Removes properties with `undefined` as value
 * @param obj Object to traversed
 */
export default function removeValuesEmpty<T>(obj: any): T {
  return Object.fromEntries(Object.entries(obj).filter(([_key, val]) => val !== undefined)) as T
}
