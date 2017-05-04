import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { LoginUsers } from './data/exampleData'
import {RESPONSE_DELAY} from '../constants/constant'

export default {
  bootstrap () {
    let mock = new MockAdapter(axios)

    mock.onGet('/success').reply(200, {
      msg: 'success'
    })

    mock.onGet('/error').reply(500, {
      msg: 'failure'
    })

    mock.onPost('/login').reply(config => {
      let { username, password } = JSON.parse(config.data)
      return new Promise((resolve, reject) => {
        let user = null
        setTimeout(() => {
          let hasUser = LoginUsers.some(u => {
            if (u.username === username && u.password === password) {
              user = JSON.parse(JSON.stringify(u))
              user.password = undefined
              return true
            }
          })
          if (hasUser) {
            resolve([200, { code: 200, msg: '请求成功', user }])
          } else {
            resolve([200, { code: 500, msg: '账号或密码错误' }])
          }
        }, RESPONSE_DELAY)
      })
    })

    mock.onGet('/control').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {code: 200, msg: '请求成功', data: '123'}])
        }, RESPONSE_DELAY)
      })
    })
  }
}
