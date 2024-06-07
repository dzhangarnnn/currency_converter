const ISAUTH_KEY = "isAuth";

export function setIsAuthLocalStorage() {
  localStorage.setItem(ISAUTH_KEY, "in");
}
export function getIsAuthLocalStorage() {
  return localStorage.getItem(ISAUTH_KEY);
}
export function removeIsAuthLocalStorage() {
  localStorage.removeItem(ISAUTH_KEY);
}
