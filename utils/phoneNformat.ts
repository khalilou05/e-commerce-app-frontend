export function phoneFormat(n: string) {
  let formatedNumber = "";
  for (let i = 0; i < n.length; i += 2) {
    let pair = n.slice(i, i + 2);
    formatedNumber += pair;
    if (i + 2 < n.length) {
      formatedNumber += " ";
    }
  }
  return formatedNumber;
}
