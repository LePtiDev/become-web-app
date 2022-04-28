import _ from "lodash";

export function validate(form: any, rules: any) {
  const content: any = _.cloneDeep(rules);
  for (const prop in rules) {
    const value: any = _.cloneDeep(form[prop]);
    content[prop] = [];
    for (const rule in rules[prop]) {
      for (let i: any = 0; i < rules[prop].length; i++) {
        if (rules[prop][i] === "require") {
          require(value) ? content[prop].push(require(value)) : "";
        } else if (rules[prop][i] === "email") {
          email(value) ? content[prop].push(email(value)) : "";
        } else {
          delete content[prop];
        }
      }
    }
  }
  for (const prop in content) {
    if (content[prop].length === 0) {
      delete content[prop];
    }
  }
  return Object.keys(content).length === 0 ? false : content;
}

function require(value: any) {
  if (value.length < 1) {
    return "Le champs est requis";
  }
  return null;
}

function email(value: any) {
  if (!value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    return "Veuillez saisir un email valide";
  }
  return null;
}
