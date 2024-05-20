import { parseAxiosError } from '../shared/parseAxiosError'
import axiosAuth from '../shared/axiosAuth'
import User from "../interfaces/IUser"

const USER_PATH: string = "/users"
const API_URL: string = "http://127.0.0.1:3000" + USER_PATH

async function getStudentId() {
  const questions = await getStudents()
  let highestId = 0
  questions.forEach(student => {
      if (student.id > highestId) {
          highestId = student.id
      }
  })
  const newId = highestId + 1
  id = newId
}
let id: number = 0

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

async function getRole(userId: string): Promise<string> {
  const user: User = await getUserById(userId)
  return user.role
}

async function createStudent (name: string, email: string, password: string) {
  try {
    await getStudentId()
    const student = {
      email: email,
      password: password,
      name: name,
      id: id,
      role: "student"
    }
    await axiosAuth.post(API_URL, student, {
      //Pour retirer une quesiton
      //https://stackoverflow.com/questions/59327261/how-to-axios-delete-with-header-when-im-getting-401-all-the-time
      headers: {
        Authorization: "Bearer "+localStorage.getItem('token')
      }
    })
  } catch (error) {
    throw parseAxiosError(error)
  }
}

async function updateUser (userId: string, name: string, newPassword: string) {
  try {
    let user: User = await getUserById(userId)
    user.name = name
    user.password = newPassword
    await axiosAuth.put(API_URL + "/" + userId, user, {
      //Pour retirer une quesiton
      //https://stackoverflow.com/questions/59327261/how-to-axios-delete-with-header-when-im-getting-401-all-the-time
      headers: {
        Authorization: "Bearer "+localStorage.getItem('token')
      }
    })
  } catch (error) {
    throw parseAxiosError(error)
  }
}

async function deleteUser (userId: string) {
  try {
    await axiosAuth.delete(API_URL + "/" + userId, {
      //Pour retirer une quesiton
      //https://stackoverflow.com/questions/59327261/how-to-axios-delete-with-header-when-im-getting-401-all-the-time
      headers: {
        Authorization: "Bearer "+localStorage.getItem('token')
      }
    })
  } catch (error) {
    throw parseAxiosError(error)
  }
}

export const userService = {
  getUserById,
  getStudents,
  getRole,
  createStudent,
  updateUser,
  deleteUser
}
