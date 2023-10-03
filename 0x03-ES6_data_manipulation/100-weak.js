export const weakMap = new WeakMap();

export function queryAPI(endpoint) {
  const count = weakMap.get(endpoint);
  if (count === undefined) {
    weakMap.set(endpoint, 1);
  } else {
    weakMap.set(endpoint, count + 1);
    if (count >= 5) throw new Error("Endpoint load is high");
  }
}
