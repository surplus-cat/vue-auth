import baseService from './base.js'

export default function authService (url, value, options) {
  return baseService(`${url}`, value, options)
}
