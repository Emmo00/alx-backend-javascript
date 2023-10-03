export default function updateUniqueItems(map) {
  for (let [key, value] of map.entries()) {
    if (value === 1) {
      try {
        map.set(key, 100);
      } catch (err) {
        throw new Error("Cannot process");
      }
    }
  }
}
