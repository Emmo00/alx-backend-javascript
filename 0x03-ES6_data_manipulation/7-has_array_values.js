export default function hasValuesFromArray(set, array) {
  let has = true;
  array.forEach((element) => {
    has = set.has(element);
  });
  return has;
}
