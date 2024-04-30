import { parseAxiosError } from '../shared/parseAxiosError'
import axiosAuth from '../shared/axiosAuth'

interface User {
  email: string,
  password: string,
  name: string,
  id: number,
  role: string,
}
const USER_PATH: string = "/users"
const API_URL: string = "http://127.0.0.1:3000" + USER_PATH

async function getUserById (userId: string): Promise<User> {
  try {
    // axiosAuth est une instance d'axios configurée pour ajouter le JWT à une requête nécessitant une authentification.
    // voir le fichier src/shared/axiosAuth.js
    const response = await axiosAuth.get(
      // TODO : utiliser une variable d'environnement pour l'url de l'api rest
      API_URL +`/${userId}`
    )

    return response.data
  } catch (error) {
    throw parseAxiosError(error)
  }
}

export const userService = {
  getUserById
}
