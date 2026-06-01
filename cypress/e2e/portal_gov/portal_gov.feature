# language: pt

Funcionalidade: gov.br - Navegação e Serviços

  Cenário: Navegar para página de Serviços
    Dado que estou na página inicial do gov.br
    Quando clico no link "Serviços"
    Então eu devo ver o breadcrumb com "Página Inicial" e "Serviços"
    E a página deve conter o título "Serviços"

  Cenário: Acessar página de Acesso à Informação
    Dado que estou na página inicial do gov.br
    Quando acesso a página de Acesso à Informação
    Então a página deve carregar corretamente
    E a página deve conter o título "Acesso à Informação"

  Cenário: Buscar serviço no gov.br
    Dado que o sistema de busca do gov.br está disponível
    Quando eu busco pelo termo "imposto de renda"
    Então eu devo receber resultados da busca
    E os resultados devem conter o termo "imposto de renda"

  Esquema do Cenário: Buscar serviços por diferentes termos
    Dado que o sistema de busca do gov.br está disponível
    Quando eu busco pelo termo "<termo_busca>"
    Então eu devo receber resultados da busca
    E a página deve retornar código 200

    Exemplos:
      | termo_busca |
      | INSS        |
      | MEI         |
      | ENEM        |