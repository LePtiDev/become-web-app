
export function requiredRule(message: any = "Le champs est requis"): (value: any) => boolean | string {
  return (value) => !!value || value === 0 || message;
}

export function emailRule(message: any = "L'email non valide"): (value: any) => boolean | string {
  return (value) => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) || message;
}