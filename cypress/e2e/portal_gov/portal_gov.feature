# language: pt
Funcionalidade: Validação do portal gov.br

  # ==========================================
  # PARTE 3: PAULO GEORGE (Integridade e Performance)
  # ==========================================

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