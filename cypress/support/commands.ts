/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare global {
    namespace Cypress {
        interface Chainable {
            login(email: string, password: string): void;
        }
    }
}

// Cette commande est utilisé dans les tests du fichier cypress/e2e/userStories.cy.js
//
// nom de la commande___          ___ paramètres de la commande
//                      V        V
Cypress.Commands.add('login', (email, password) => {
    // On retrouve ici le même code que le test "je peux me connecter - version 1".
    cy.visit('/login')
    cy.get('input[name=email-input]').type(email)
    cy.get('input[name=password-input]').type(password)
    cy.get('button[type=submit]').click()

    cy.contains(/déconnecter/i)
})

export {}
