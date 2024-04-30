// Toutes les erreurs sont transformées en objet Error qui lui contient seulement un message d'erreur.
export function parseAxiosError (axiosError) {
  if (isNetworkError(axiosError)) {
    const error = new Error(
      'Erreur réseau. Impossible de communiquer avec le serveur.'
    )
    return error
  } else {
    // Les messages d'erreurs générés par l'API REST proviennent de json-server-auth et sont en anglais (exemple: Incorrect password, Cannot find user, etc.)
    // Dans le cadre du cours, on peut considérer que l'api rest en production générerait les erreurs en français...
    // Ci-dessous, axiosError.response.data contient le message d'erreur de l'API REST.
    const error = new Error(axiosError.response.data)
    return error
  }
}

// Cette fonction permet de déterminer si une erreur est une erreur de réseau.
function isNetworkError (error) {
  // Si l'erreur ne contient pas de réponse, c'est qu'il y a eu un problème de réseau.
  return error.isAxiosError && !error.response
}
