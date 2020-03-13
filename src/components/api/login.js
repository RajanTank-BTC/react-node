import client from './client'
import axios from 'axios'

const loginNewUser = (body) => {
  return client.post('/api/login', body)
}

const userInfo = (body) => {
  return client.get('/api/info')
}

const updateValues = (body) => {
  return client.put('/api/update', body)
}

export { loginNewUser, userInfo, updateValues } 