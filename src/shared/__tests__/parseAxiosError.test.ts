import { describe, test, expect } from 'vitest'
import { parseAxiosError } from '../parseAxiosError'

describe('parseAxiosErrorToError', () => {
  test("doit retourner une erreur avec le message d'erreur d'axios", () => {
    const error = {
      isAxiosError: true,
      response: {
        data: "message d'erreur d'axios"
      }
    }
    const result = parseAxiosError(error)

    expect(result.message).toBe("message d'erreur d'axios")
  })

  test('doit retourner une erreur réseau si aucune réponse du serveur', () => {
    const error = {
      isAxiosError: true
    }

    const result = parseAxiosError(error)

    expect(result.message).toMatch(/erreur réseau/i)
  })
})
