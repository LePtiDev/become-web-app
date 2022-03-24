// Mardi 15 mars, 14
export const getFullDate = (date: any) => {
  let newDate = new Date(date * 1000);
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

export const getFormatInputDate = (date: any) => {
  let newDate = new Date(date * 1000);
  const options: any = {
    hour: "2-digit",
    minute: "2-digit",
  };
  const ye: any = new Intl.DateTimeFormat('FR', { year: 'numeric' }).format(newDate)
  const mo: any = new Intl.DateTimeFormat('FR', { month: '2-digit' }).format(newDate)
  const da: any = new Intl.DateTimeFormat('FR', { day: '2-digit' }).format(newDate)
  const time: any = newDate.toLocaleString("FR", options);
  return ye + "-" + mo + "-" + da + "T" + time
}

export const getFormatInputDateTime = (date: any) => {
  let newDate = new Date(date * 1000);
  const ye: any = new Intl.DateTimeFormat('FR', { year: 'numeric' }).format(newDate)
  const mo: any = new Intl.DateTimeFormat('FR', { month: 'short' }).format(newDate)
  const da: any = new Intl.DateTimeFormat('FR', { day: '2-digit' }).format(newDate)
  return ye + "-" + mo + "-" + da;
}

export const getDate = (date: any) => {
  let newDate = new Date(date * 1000);
  const options: any = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  return newDate.toLocaleString("FR", options);
}

export const getHour = (date: any) => {
  let newDate = new Date(date * 1000) ;
  const options: any = {
    hour: "2-digit",
    minute: "2-digit",
  };
  return newDate.toLocaleString("FR", options);
}