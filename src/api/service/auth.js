import authService from '../base-service/auth.js'

export default {
  login (data) {
    return authService('/user/login', data)
  }
}
