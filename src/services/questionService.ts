import { parseAxiosError } from '../shared/parseAxiosError'
import axiosAuth from '../shared/axiosAuth'
import Question from '../interfaces/IQuestion'

const QUESTION_PATH: string = "/questions"
const API_URL: string = "http://127.0.0.1:3000" + QUESTION_PATH

//En incluant les id déjà présent dans la bd, ceci est le premier index disponible
let id: number = 2
function getQuestionId(): number {
  let idToReturn = id
  id++
  return idToReturn
}

async function getQuestionById (questionId: string): Promise<Question> {
    try {
      // axiosAuth est une instance d'axios configurée pour ajouter le JWT à une requête nécessitant une authentification.
      // voir le fichier src/shared/axiosAuth.js
      const response = await axiosAuth.get(
        // TODO : utiliser une variable d'environnement pour l'url de l'api rest
        API_URL +`/${questionId}`
      )
  
      return response.data
    } catch (error) {
      throw parseAxiosError(error)
    }
}

async function getQuestions(): Promise<Question[]> {
  try {
    const response = await axiosAuth.get(
      API_URL +'/'
    )
    return response.data
  } catch (error) {
    throw parseAxiosError(error)
  }
}

async function createQuestion (question: Question) {
  try {
    await axiosAuth.post(API_URL, {
      question
    })
  } catch (error) {
    throw parseAxiosError(error)
  }
}

async function deleteQuestion (questionId: string) {
  try {
    await axiosAuth.delete(API_URL + "/" + questionId)
  } catch (error) {
    throw parseAxiosError(error)
  }
}

  
export const questionService = {
  getQuestionId,
  getQuestions,
  getQuestionById,
  createQuestion,
  deleteQuestion
}