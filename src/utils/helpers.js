import CryptoJS from "crypto-js";

const generateSign = (method, path, data, secret) => {
  const signstr = `${method}${path}${data && JSON.stringify(data)}${secret}`;
  const sign = CryptoJS.MD5(signstr).toString();
  return sign;
};
export default generateSign;

export const getLocalStorage = (key) => {
  return localStorage.getItem(key);
}

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
}

export const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
}
