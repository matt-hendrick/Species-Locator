export const toTitleCase = (str: string) => {
  let newStr = str.toLowerCase().split(' ');
  for (var i = 0; i < newStr.length; i++) {
    newStr[i] = newStr[i].charAt(0).toUpperCase() + newStr[i].slice(1);
  }
  return newStr.join(' ');
};

export const googleAnalytics = () => {
  if (window.gtag && process.env.REACT_APP_FIREBASE_MEASUREMENT_ID) {
    window.gtag('config', process.env.REACT_APP_FIREBASE_MEASUREMENT_ID, {
      page_title: document.title,
      page_path: window.location.pathname + window.location.search,
    });
  }
};
