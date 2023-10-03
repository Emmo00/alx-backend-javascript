export default function cleanSet(set, startString) {
  let res = '';
  if (startString === '') return '';
  set.forEach((val) => {
    if (val.startsWith(startString)) {
      res += val.slice(startString.length, val.length);
      res += '-';
    }
  });
  return res.slice(0, -1);
}
