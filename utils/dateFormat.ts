export function dateFormat(date: string) {
  const formated = Date.parse(date);

  const final = new Intl.DateTimeFormat("ar-DZ", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    minute: "2-digit",
    hour: "2-digit",
    dayPeriod: "long",
  }).format(formated);

  return final;
}
