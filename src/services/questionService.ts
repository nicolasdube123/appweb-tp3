import { parseAxiosError } from '../shared/parseAxiosError'
import axiosAuth from '../shared/axiosAuth'
import Question from '../interfaces/IQuestion'

const QUESTION_PATH: string = "/questions"
const API_URL: string = "http://127.0.0.1:3000" + QUESTION_PATH

//En incluant les id déjà présent dans la bd, ceci est le premier index disponible
let id: number = 4

async function getQuestionById (userId: string): Promise<Question> {
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
    getQuestionById
}