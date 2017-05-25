import * as api from '../api/apis'

export const login = (map) =>
  api.login('POST', '/api/customer', map)

export const getArticles = (token) =>
  api.articles('GET', '/api/v1/home/articles', token)
