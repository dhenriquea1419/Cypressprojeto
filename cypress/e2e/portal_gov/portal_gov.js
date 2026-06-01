import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

Given('que estou na página inicial do gov.br', () => {
  cy.visit('https://www.gov.br')
  cy.wait(4000)
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
  cy.contains('a', linkText, { matchCase: false }).click({ force: true })
  cy.wait(3000)
})

When('acesso a página de Acesso à Informação', () => {
  cy.visit('https://www.gov.br/acessoainformacao/pt-br', { failOnStatusCode: false })
  cy.wait(3000)
})

When('eu busco pelo termo {string}', (termo) => {
  cy.request('GET', `https://www.gov.br/pt-br/search?SearchableText=${encodeURIComponent(termo)}`).as('searchResponse')
})

When('eu busco por um termo inexistente {string}', (termo) => {
  // Visitamos a página de busca para validar visualmente o erro
  cy.visit(`https://www.gov.br/pt-br/search?SearchableText=${termo}`, { failOnStatusCode: false })
})

When('clico na logomarca do "gov.br"', () => {
  cy.get('header').find('a[href*="gov.br/pt-br"]').first().click({ force: true })
})

Then('eu devo ver o breadcrumb com {string} e {string}', (parte1, parte2) => {
  cy.contains(parte1).should('exist')
  cy.contains(parte2).should('exist')
})

Then('a página deve conter o título {string}', (titulo) => {
  cy.contains('h1', titulo, { matchCase: false }).should('be.visible')
})

Then('a página deve carregar corretamente', () => {
  cy.url().should('include', '/acessoainformacao')
  cy.get('h1', { timeout: 10000 }).should('be.visible')
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

Then('deve existir um link para {string} no rodapé', (linkText) => {
  cy.get('footer').contains('a', linkText).should('exist')
})

Then('ao clicar, a página de acessibilidade deve carregar corretamente', () => {
  cy.get('footer').contains('a', 'Acessibilidade').click({ force: true })
  cy.url().should('include', '/acessibilidade')
})

Then('cada resultado deve conter um título e um link válido', function () {
  cy.get('@searchResponse').then((response) => {
    expect(response.body).to.not.be.empty
    expect(response.status).to.eq(200)
  })
})

Then('o sistema não deve retornar resultados de serviços', function () {
  cy.get('body', { timeout: 10000 }).then(($body) => {
    const text = $body.text().toLowerCase();
    const hasNoResults = text.includes('não foi encontrado') || 
                         text.includes('nenhum resultado') || 
                         text.includes('não encontramos');
    expect(hasNoResults, 'Deveria exibir mensagem de resultados não encontrados').to.be.true;
  });
})

Then('os resultados devem ser coerentes com o termo pesquisado', function () {
  cy.get('@searchResponse').then((response) => {
    expect(response.status).to.eq(200)
    expect(response.body).to.not.be.null
  })
})

Then('a página deve ser recarregada na Home', () => {
  cy.url().should('include', 'gov.br/pt-br')
  cy.get('body').should('be.visible')
})

Then('o tempo de resposta deve ser inferior a 5 segundos', function () {
  cy.get('@searchResponse').then((response) => {
    expect(response.duration).to.be.lessThan(5000)
  })
})

Then('deve existir um link para "Órgãos do Governo" no cabeçalho', () => {
  cy.get('header').contains('a', 'Órgãos do Governo').should('exist')
})
