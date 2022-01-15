import { User } from "./screen/project-list";

const localStorageKey = "__auth_provider_token__";
const apiUrl = process.env.REACT_APP_API_URL;
export const getToken = () => window.localStorage.getItem(localStorageKey);
const handleResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export const login = (param: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(param),
  }).then(async (response) => {
    if (response.ok) {
      return handleResponse(await response.json());
    } else {
      return Promise.reject(param)
    }
  });
};

export const register = (param: { username: string; password: string }) => {
    return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(param),
  }).then(async (response) => {
    if (response.ok) {
      return handleResponse(await response.json());
    }else {
      return Promise.reject(param)
    }
  });
};

export const logout = async() => window.localStorage.removeItem(localStorageKey);
