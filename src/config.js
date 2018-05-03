import request from 'requestretry'
import { log } from './logger'

export const get = async (owner, env, config) => new Promise(async (resolve, reject) => {
  try {
    if (!config || typeof config !=='object') return reject('Config param is missing or not an object type')
    if (!config.CONFIG_URL) return reject('Missing config url attribute of config object')
    if (!config.HEADER_TOKEN) return reject('Missing header token attribute of config object')
    if (!owner) return reject('Missing owner parameter')
    if (!env) return reject('Missing environment parameter')

    const url = `${config.CONFIG_URL}/api/${owner}/${env}/config`
    const authorize = `Bearer ${config.HEADER_TOKEN}`
    const response = await request({
      url,
      method: 'get',
      json: true,
      fullResponse: false,
      headers: {
        authorization: authorize,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(r => r.data)
      .catch((e) => {
        log.error('getOwnerConfig: ', e)
        return reject(e)
      });
    return resolve(response)
  } catch (e) {
    return reject(e)
  }
})
