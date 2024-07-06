export function dateFormat(date: string) {
  const formated = Date.parse(date);

  const final = new Intl.DateTimeFormat("fr", {
    day: "2-digit",
    month: "2-digit",
  }).format(formated);

  return final;
}
