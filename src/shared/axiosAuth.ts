import axios from 'axios'
import { useAuthStore } from '../stores/authStore'

// Le but de ce fichier est de créer une instance d'axios configurée pour ajouter le JWT à toute requête nécessitant une authentification. C'est aussi l'endroit où la gestion du rafraîchissement du token d'authentification pourrait se faire.

// axios.create() permet de créer une instance d'axios.
const axiosAuth = axios.create()
// À cette instance, on peut ajouter des intercepteurs. Un intercepteur est une fonction qui est appelée avant chaque requête.
// Ici, l'intercepteur ajoute, si l'utilisateur est connecté, le token d'authentification à la requête.
axiosAuth.interceptors.request.use(config => {
  const authstore = useAuthStore()
  if (authstore.isLoggedIn) {
    if (authstore.isTokenExpired) {
      authstore.refreshToken()
    }
    // Ajout du token d'authentification à la requête.
    config.headers.Authorization = `Bearer ${authstore.token}`
  }
  return config
})

export default axiosAuth
