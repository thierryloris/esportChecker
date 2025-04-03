// api.ts file
import axios from 'axios'
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  headers: {
    accept: 'application/json',
    authorization: 'Bearer amN3tC5Qlwr4KwggI33zXdxd17V-h7GOWv2NvxFa7XOfTS6CmAc',
  },
})
export default instance
