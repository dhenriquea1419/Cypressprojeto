# 🚀 CypressProject – Automação de Testes E2E com Cypress e Cucumber

<p align="center">
  <img src="https://img.shields.io/badge/Cypress-Automação-green?style=for-the-badge&logo=cypress" />
  <img src="https://img.shields.io/badge/Cucumber-BDD-brightgreen?style=for-the-badge&logo=cucumber" />
  <img src="https://img.shields.io/badge/Node.js-18%2B-success?style=for-the-badge&logo=node.js" />
</p>

# Link do vídeo sobre o projeto 

https://drive.google.com/file/d/1OqDt7FiyeJHtjWMH6DoA9VezJhStxAnV/view?usp=drive_link


## 📖 Sobre o Projeto

O **CypressProject** é um projeto de automação de testes End-to-End (E2E) desenvolvido para validar funcionalidades do portal **gov.br**.

A solução utiliza:

* **Cypress** para automação dos testes;
* **Cucumber (BDD)** para descrição dos cenários em linguagem natural;
* **JavaScript** para implementação das etapas automatizadas.

O objetivo é garantir a qualidade das principais funcionalidades do portal, verificando navegação, buscas, acessibilidade, desempenho e integridade dos resultados apresentados ao usuário.

---

# 📋 Planejamento dos Testes

## 🎯 Objetivo

Validar continuamente as funcionalidades essenciais do portal gov.br, assegurando que:

* Os usuários consigam navegar entre páginas sem erros;
* As buscas retornem resultados válidos;
* Os recursos de acessibilidade estejam disponíveis;
* Os elementos institucionais funcionem corretamente;
* O sistema apresente desempenho adequado.

---

## 📌 Escopo dos Testes

Os testes contemplam:

### Navegação

* Acesso às páginas institucionais;
* Validação de títulos;
* Verificação de breadcrumbs;
* Redirecionamentos.

### Busca de Serviços

* Pesquisa por diferentes termos;
* Validação de respostas da API;
* Verificação de resultados retornados;
* Tratamento de pesquisas sem resultados.

### Acessibilidade

* Verificação dos links de acessibilidade;
* Navegação para páginas inclusivas.

### Performance

* Tempo de resposta das buscas;
* Disponibilidade dos serviços.

### Elementos Globais

* Funcionamento da logomarca;
* Estrutura principal da aplicação.

---

## 👥 Divisão de Responsabilidades

| Integrante      | Responsabilidade                                  |
| --------------- | ------------------------------------------------- |
| Daniel Henrique | Navegação e busca de serviços                     |
| Gustavo         | Acessibilidade, robustez e validação da API       |
| Paulo George    | Performance, logomarca e elementos institucionais |

---

# 🧪 Cenários de Teste (BDD)

Os cenários foram escritos utilizando a sintaxe Gherkin e implementados no arquivo:

```bash
cypress/e2e/portal_gov/portal_gov.feature
```

---

## 🔹 Navegação Básica (Daniel)

### Cenário: Navegar para página de Serviços

```gherkin
Dado que estou na página inicial do gov.br
Quando clico no link "Serviços"
Então eu devo ver o breadcrumb com "Página Inicial" e "Serviços"
E a página deve conter o título "Serviços"
```

### Cenário: Acessar página de Acesso à Informação

```gherkin
Dado que estou na página inicial do gov.br
Quando acesso a página de Acesso à Informação
Então a página deve carregar corretamente
E a página deve conter o título "Acesso à Informação"
```

### Esquema do Cenário: Buscar serviços por diferentes termos

```gherkin
Dado que o sistema de busca do gov.br está disponível
Quando eu busco pelo termo "<termo_busca>"
Então eu devo receber resultados da busca
E a página deve retornar código 200

Exemplos:
| termo_busca |
| INSS        |
| MEI         |
| ENEM        |
```

---

## 🔹 Acessibilidade e Robustez (Gustavo)

### Cenário: Verificar links de acessibilidade no rodapé

```gherkin
Dado que estou na página inicial do gov.br
Então deve existir um link para "Acessibilidade" no rodapé
E ao clicar, a página de acessibilidade deve carregar corretamente
```

### Cenário: Validar integridade dos dados da API de busca

```gherkin
Dado que o sistema de busca do gov.br está disponível
Quando eu busco pelo termo "Certificado"
Então cada resultado deve conter um título e um link válido
```

### Cenário: Validar resposta negativa na busca

```gherkin
Dado que o sistema de busca do gov.br está disponível
Quando eu busco por um termo inexistente "termoinvalido12345"
Então o sistema não deve retornar resultados de serviços
```

### Esquema do Cenário: Validar busca por termos técnicos

```gherkin
Dado que o sistema de busca do gov.br está disponível
Quando eu busco pelo termo "<termo_gustavo>"
Então eu devo receber resultados da busca
E os resultados devem ser coerentes com o termo pesquisado

Exemplos:
| termo_gustavo |
| Protocolo     |
| Certidão      |
| Autenticação  |
```

---

## 🔹 Performance e Elementos Globais (Paulo George)

### Cenário: Validar que a logomarca redireciona para a Home

```gherkin
Dado que estou na página inicial do gov.br
Quando clico na logomarca do gov.br
Então a página deve ser recarregada na Home
```

### Cenário: Validar tempo de resposta da busca

```gherkin
Dado que o sistema de busca do gov.br está disponível
Quando eu busco pelo termo "transparência"
Então o tempo de resposta deve ser inferior a 5 segundos
```

### Esquema do Cenário: Validar busca por termos institucionais

```gherkin
Dado que o sistema de busca do gov.br está disponível
Quando eu busco pelo termo "<termo_george>"
Então eu devo receber resultados da busca
E a página deve retornar código 200

Exemplos:
| termo_george |
| Legislação   |
| Órgãos       |
| Presidência  |
```

---

# 🤖 Automação dos Cenários

Todos os cenários descritos em Gherkin foram automatizados utilizando:

* Cypress
* Cucumber
* JavaScript

### Estrutura do Projeto

```bash
cypress/
│
├── e2e/
│   └── portal_gov/
│       ├── portal_gov.feature
│       └── portal_gov.cy.js
│
├── support/
│
└── fixtures/
```

### Implementação

Os passos definidos nos cenários Gherkin foram mapeados para funções automatizadas através dos arquivos de Step Definitions, permitindo a execução automática dos fluxos de teste.

Durante a execução são realizadas validações como:

* Carregamento correto das páginas;
* Verificação de elementos da interface;
* Validação de códigos HTTP;
* Testes de busca;
* Testes de acessibilidade;
* Medição de desempenho.

---

# 🛠 Tecnologias Utilizadas

| Tecnologia      | Finalidade                    |
| --------------- | ----------------------------- |
| Cypress         | Automação E2E                 |
| Cucumber        | BDD                           |
| JavaScript ES6+ | Implementação dos testes      |
| Node.js 18+     | Ambiente de execução          |
| npm             | Gerenciamento de dependências |

---

# ▶️ Como Executar

## Pré-requisitos

* Node.js 18 ou superior
* npm instalado

---

## Instalar Dependências

```bash
npm install
```

---

## Executar em Modo Interativo

```bash
npx cypress open
```

Selecione:

```bash
cypress/e2e/portal_gov/portal_gov.feature
```

---

## Executar em Modo Headless

```bash
npx cypress run --spec "cypress/e2e/portal_gov/portal_gov.feature"
```

---

## Relatórios

Após a execução, os resultados serão exibidos no terminal.

Como melhoria futura, o projeto pode utilizar:

* multiple-cucumber-html-reporter
* mochawesome
* Cypress Dashboard

para geração de relatórios detalhados e métricas de execução.

---

# ✅ Critérios Atendidos

### Planejamento dos Testes

✔ Objetivos definidos

✔ Escopo documentado

✔ Divisão de responsabilidades

✔ Estratégia de validação descrita

### Escrita dos Cenários de Teste

✔ Cenários em Gherkin

✔ Casos positivos e negativos

✔ Uso de Esquema do Cenário

✔ Cobertura funcional e não funcional

### Automação dos Cenários

✔ Implementação com Cypress

✔ Integração com Cucumber

✔ Execução automatizada

✔ Validações de interface, API e performance

---

## 👨‍💻 Equipe

* Daniel Henrique
* Gustavo
* Paulo George

Projeto acadêmico desenvolvido para a disciplina de Testes de Software utilizando Cypress e Cucumber para automação de testes End-to-End.
