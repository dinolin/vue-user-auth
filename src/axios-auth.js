import axios from 'axios'

const instance = axios.create({
  //baseURL: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'
  baseURL: 'http://localhost:5000/api/v2.0'
})
//instance.defaults.headers.common['Authorization'] = this.$cookie.get('access_token_cookie')
//instance.defaults.headers.common['Cookie'] =  '12345' // this.$cookie.get('access_token_cookie')


const reqInterceptor = axios.interceptors.request.use(config => {
  console.log('Request Interceptor', config)
  return config
})

const resInterceptor = axios.interceptors.response.use(res => {
  if (res.data.token) {
    window.localStorage.setItem('token', res.data.token)
  }
  console.log('Response Interceptor', res)
  return res
});

instance.interceptors.request.eject(reqInterceptor)
instance.interceptors.response.eject(resInterceptor)

export default instance