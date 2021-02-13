export const toTitleCase = (str: string) => {
  let newStr = str.toLowerCase().split(' ');
  for (var i = 0; i < newStr.length; i++) {
    newStr[i] = newStr[i].charAt(0).toUpperCase() + newStr[i].slice(1);
  }
  return newStr.join(' ');
};
