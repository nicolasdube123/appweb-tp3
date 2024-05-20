describe('Récits utilisateur', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

  // On définit un utilisateur pour les tests. Cet utilisateur sera créé dans la base de données avant chaque test.
  const teacherUser = {
    email: 'mon@courriel.com',
    password: 'monmotdepasse',
    name: 'Bruce Lee',
    id: 1,
    role: "teacher"
  }
  const studentUser = {
    email: 'test@test.com',
    password: 'motdepasse',
    name: 'Jean Guy',
    id: 2,
    role: "student"
  }

  // Exécuté avant chaque test
  beforeEach(() => {
    // On réinitialise la base de données en appelant le script backend:cypress:seed qui se trouve dans le package.json. Ce script copie le fichier db-cypress-default.json dans db-cypress.json qui est utilisé par le serveur backend. Ainsi, on a une base de données propre pour chaque test.
    cy.exec('npm run backend:cypress:seed')

    // On ajoute l'utilisateur à la BD en utilisant la commande POST /register de notre API REST (serveur backend).
    // TODO : utiliser une variable d'environnement pour l'URL du serveur backend.
    cy.request('POST', 'http://127.0.0.1:3000/register', {
      email: teacherUser.email,
      password: teacherUser.password,
      name: teacherUser.name,
      id: teacherUser.id,
      role: teacherUser.role
    })
    cy.request('POST', 'http://127.0.0.1:3000/register', {
      email: studentUser.email,
      password: studentUser.password,
      name: studentUser.name,
      id: studentUser.id,
      role: studentUser.role
    })
  })

  // Les tests sont écrits sous forme de récits utilisateur. Voir les notes de cours à ce sujet.
  it("je peux accéder à la page d'accueil", () => {
    // L'instruction `cy` permet d'exécuter des commandes de Cypress.
    // Ici, on visite la page d'accueil.
    cy.visit('/')

    // On vérifie que la page contient, dans une balise H1, le texte "Accueil"
    cy.contains('h1', /accueil/i)
  })

  it('je peux me connecter en tant qu\'étudiant - version 1 ', () => {
    cy.visit('/login')

    // On utilise .get pour sélectionner dans le DOM un élément input dont l'attribut name est email-input. Ensuite, .type est utilisé pour saisir du texte dans cet élément.
    cy.get('input[name=email-input]').type(studentUser.email)
    cy.get('input[name=password-input]').type(studentUser.password)
    // On utilise .get pour sélectionner dans le DOM un élément bonton dont l'attribut type est submit). Ensuite, .click est utilisé pour cliquer sur cet élément.
    cy.get('button[type=submit]').click()

    cy.contains(/déconnecter/i)
  })

  it('je peux me connecter en tant qu\'étudiant - version 2', () => {
    // Ici on utilise la commande login qui est définie dans le fichier cypress/support/commands.js. Cette commande est disponible dans tous les tests et évite de répéter le code de connexion. Cette version est plus courte et plus lisible.
    cy.login(studentUser.email, studentUser.password)
    
  })
  
  it('je peux changer de mot de passe en tant qu\'étudiant - version 2', () => {
    // Ici on utilise la commande login qui est définie dans le fichier cypress/support/commands.js. Cette commande est disponible dans tous les tests et évite de répéter le code de connexion. Cette version est plus courte et plus lisible.
    cy.login(studentUser.email, studentUser.password)
    
    cy.contains(/Profile/i).click()
    cy.wait(500)
    cy.reload()

    cy.get('input[name=newPassword]').type("nouveauMotDePasse")

  })

  it('je peux me connecter en tant que professeur - version 1 ', () => {
    cy.visit('/login')
    
    // On utilise .get pour sélectionner dans le DOM un élément input dont l'attribut name est email-input. Ensuite, .type est utilisé pour saisir du texte dans cet élément.
    cy.get('input[name=email-input]').type(teacherUser.email)
    cy.get('input[name=password-input]').type(teacherUser.password)
    // On utilise .get pour sélectionner dans le DOM un élément bonton dont l'attribut type est submit). Ensuite, .click est utilisé pour cliquer sur cet élément.
    cy.get('button[type=submit]').click()
    
    cy.contains(/déconnecter/i)
  })
  
  it('je peux me connecter en tant que professeur - version 2', () => {
    // Ici on utilise la commande login qui est définie dans le fichier cypress/support/commands.js. Cette commande est disponible dans tous les tests et évite de répéter le code de connexion. Cette version est plus courte et plus lisible.
    cy.login(teacherUser.email, teacherUser.password)
  })

  it('je peux me déconnecter', () => {
    cy.login(teacherUser.email, teacherUser.password)
    cy.wait(500)

    cy.contains(/déconnecter/i).click()

    cy.contains(/connexion/i)
  })

  it('je peux voir mon profil', () => {
    cy.login(teacherUser.email, teacherUser.password)
    cy.reload()
    cy.wait(500)
    cy.reload()
    
    cy.contains(/Profile/i).click()

    cy.contains(teacherUser.name)
    cy.contains(teacherUser.email)
  })
})
