// Mardi 15 mars, 14
export const getFullDate = (date: any) => {
  let newDate = new Date(date);
  const options: any = {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return newDate.toLocaleString("FR", options);
}