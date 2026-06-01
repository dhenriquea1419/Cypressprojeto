import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

Given('que estou na página inicial do gov.br', () => {
  cy.visit('https://www.gov.br')
  cy.wait(4000)
  // Fechar overlay de cookies se existir
  cy.get('body').then(($body) => {
    if ($body.find('[aria-label="Fechar overlay"]').length > 0) {
      cy.get('[aria-label="Fechar overlay"]').click({ force: true })
    }
  })
})

Given('que o sistema de busca do gov.br está disponível', () => {
  cy.request('https://www.gov.br/pt-br/search?SearchableText=teste').then((response) => {
    expect(response.status).to.eq(200)
  })
})

When('clico no link {string}', (linkText) => {
  cy.contains('a', linkText).click({ force: true })
  cy.wait(3000)
})

When('acesso a página de Acesso à Informação', () => {
  cy.visit('https://www.gov.br/acessoainformacao/pt-br', { failOnStatusCode: false })
  cy.wait(3000)
})

When('eu busco pelo termo {string}', (termo) => {
  cy.request('GET', `https://www.gov.br/pt-br/search?SearchableText=${encodeURIComponent(termo)}`).as('searchResponse')
})

Then('eu devo ver o breadcrumb com {string} e {string}', (parte1, parte2) => {
  cy.contains(parte1).should('exist')
  cy.contains(parte2).should('exist')
})

Then('a página deve conter o título {string}', (titulo) => {
  // Busca o título dentro de tags de cabeçalho ou elementos de título do Plone
  cy.contains('h1', titulo, { matchCase: false }).should('be.visible')
})

Then('a página deve carregar corretamente', () => {
  cy.url().should('include', '/acessoainformacao')
  cy.get('body').should('be.visible')
})

Then('eu devo receber resultados da busca', function () {
  cy.get('@searchResponse').then((response) => {
    expect(response.status).to.eq(200)
  })
})

Then('os resultados devem conter o termo {string}', function (termo) {
  cy.get('@searchResponse').then((response) => {
    expect(response.body.toLowerCase()).to.include(termo.toLowerCase())
  })
})

Then('a página deve retornar código 200', function () {
  cy.get('@searchResponse').then((response) => {
    expect(response.status).to.eq(200)
  })
})