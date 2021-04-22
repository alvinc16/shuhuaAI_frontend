import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const CookieKey = 'shuhuaAI_cookie'
const CookieFinal = 'JSESSIONID'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getCookie() {
  return Cookies.get(CookieKey)
}

export function setCookie(cookie) {
  return Cookies.set(CookieKey, cookie)
}

export function removeCoodie() {
  return Cookies.remove(CookieKey)
}
export function removeCookieFinal() {
  return Cookies.remove(CookieFinal)
}
