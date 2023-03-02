export const validation = (name: string, value: string) => {
  const hourRegex = /^[\d\u06F0-\u06F9]+$/;
  const minutesRegex = /^([0-5]?[0-9]|۰*[۰-۵]?[۰-۹])$/;
  const urlRegex = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/[^\s]*)?$/i;
  switch (name) {
    case "hour":
      if (!value) {
        return "";
      }
      if (!hourRegex.test(value)) {
        return "You should Just use numbers";
      } else {
        return "";
      }
    case "minutes":
      if (!value) {
        return "";
      }
      if (!hourRegex.test(value)) {
        return "You should Just use numbers";
      } else if (!minutesRegex.test(value)) {
        return "You should enter numbers less than 60";
      } else {
        return "";
      }
    case "seconds":
      if (!value) {
        return "";
      }
      if (!hourRegex.test(value)) {
        return "You should Just use numbers";
      } else if (!minutesRegex.test(value)) {
        return "You should enter numbers less than 60";
      } else {
        return "";
      }

    case "url":
      if (!value) {
        return "Url is a required field";
      }
      if (!urlRegex.test(value)) {
        return "Is not a valid Url";
      } else {
        return "";
      }
  }
};
