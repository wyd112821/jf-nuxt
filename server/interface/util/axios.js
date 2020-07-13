import axios from 'axios'

const instance = axios.create({
  baseURL: `http://192.168.1.182`,
  timeout: 2000,
  headers: {

  }
})

export default instance
