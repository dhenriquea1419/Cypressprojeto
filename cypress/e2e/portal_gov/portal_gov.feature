# language: pt
#Navegação Básica (Daniel)
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

#Acessibilidade e Robustez (Gustavo)
Cenário: Verificar links de acessibilidade no rodapé
    Dado que estou na página inicial do gov.br
    Então deve existir um link para "Acessibilidade" no rodapé
    E ao clicar, a página de acessibilidade deve carregar corretamente

  Cenário: Validar integridade dos dados da API de busca
    Dado que o sistema de busca do gov.br está disponível
    Quando eu busco pelo termo "Certificado"
    Então cada resultado deve conter um título e um link válido

  Cenário: Validar resposta negativa na busca
    Dado que o sistema de busca do gov.br está disponível
    Quando eu busco por um termo inexistente "termoinvalido12345"
    Então o sistema não deve retornar resultados de serviços

  Esquema do Cenário: Gustavo - Validar busca por termos técnicos
    Dado que o sistema de busca do gov.br está disponível
    Quando eu busco pelo termo "<termo_gustavo>"
    Então eu devo receber resultados da busca
    E os resultados devem ser coerentes com o termo pesquisado

    Exemplos:
      | termo_gustavo |
      | Protocolo     |
      | Certidão      |
      | Autenticação  |

#Performance e Elementos Globais (Paulo George)
Cenário: Validar que a logomarca redireciona para a Home
    Dado que estou na página inicial do gov.br
    Quando clico na logomarca do "gov.br"
    Então a página deve ser recarregada na Home

  Cenário: Validar tempo de resposta da busca
    Dado que o sistema de busca do gov.br está disponível
    Quando eu busco pelo termo "transparência"
    Então o tempo de resposta deve ser inferior a 5 segundos

  Cenário: Verificar link de Órgãos do Governo no cabeçalho
    Dado que estou na página inicial do gov.br
    Então deve existir um link para "Órgãos do Governo" no cabeçalho

  Esquema do Cenário: Paulo George - Validar busca por termos institucionais
    Dado que o sistema de busca do gov.br está disponível
    Quando eu busco pelo termo "<termo_george>"
    Então eu devo receber resultados da busca
    E a página deve retornar código 200

    Exemplos:
      | termo_george |
      | Legislação   |
      | Presidência  |
      | Ouvidoria    |