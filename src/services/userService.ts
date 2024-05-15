import { parseAxiosError } from '../shared/parseAxiosError'
import axiosAuth from '../shared/axiosAuth'
import User from "../interfaces/IUser"

const USER_PATH: string = "/users"
const API_URL: string = "http://127.0.0.1:3000" + USER_PATH

//En incluant les id déjà présent dans la bd, ceci est le premier index disponible
let id: number = 4

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

async function getStudents() : Promise<Array<User>> {
  try {
    const response = await axiosAuth.get(
      API_URL +`/`
    )
    return response.data.filter((user: User) => user.role === "student")
  } catch (error) {
    throw parseAxiosError(error)
  }
}

async function isUserWithGoodRole(userId: string, role: string): Promise<boolean> {
  const user: User = await getUserById(userId)
  return user.role === role
}

async function createStudent (name: string, email: string, password: string) {
  try {
    await axiosAuth.post(API_URL, {
      email: email,
      password: password,
      name: name,
      id: id,
      role: "student"
    })
  } catch (error) {
    throw parseAxiosError(error)
  }

  id++
}

async function updatePassword (userId: string, newPassword: string) {
  try {
    let user: User = await getUserById(userId)
    user.password = newPassword
    
    await axiosAuth.put(API_URL + "/" + userId, {
      user
    })
  } catch (error) {
    throw parseAxiosError(error)
  }

}

async function deleteUser (userId: string) {
  try {
    await axiosAuth.delete(API_URL + "/" + userId)
  } catch (error) {
    throw parseAxiosError(error)
  }
}

export const userService = {
  getUserById,
  getStudents,
  isUserWithGoodRole,
  createStudent,
  updatePassword,
  deleteUser
}
