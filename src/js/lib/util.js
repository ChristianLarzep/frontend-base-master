export default function findIndex(arr = [], value, key = 'id') {
  let index = -1;

  for (let i = 0, len = arr.length; i < len; i += 1) {
    if (arr[i][key] === value) {
      index = i;
      break;
    }
  }

  return index;
}
