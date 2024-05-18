import axios from 'axios'
import { parseAxiosError } from '../shared/parseAxiosError'

const LOGIN_PATH: string = "/login"
const API_URL: string = "http://127.0.0.1:3000" + LOGIN_PATH

async function getToken (credential) {
  try {
    // TODO : utiliser une variable d'environnement pour l'url de l'API REST
    console.log(credential)
    const response = await axios.post(API_URL, {
      email: credential.email,
      password: credential.password
    })
    const token = response.data.accessToken
    return token
  } catch (error) {
    // Voir la fonction parseAxiosError dans le fichier src/shared/parseAxiosError.js.
    throw parseAxiosError(error)
  }
}

export const authService = {
  getToken
}