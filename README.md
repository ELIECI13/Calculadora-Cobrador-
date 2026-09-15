# FechaBus — Calculadora de fechamento de caixa

Aplicação web que criei a partir de uma situação que conheço da rotina do transporte coletivo: conferir os números da roleta e o valor esperado no fechamento do caixa.

A proposta não é substituir um sistema de bilhetagem. É uma ferramenta simples de conferência e, ao mesmo tempo, um projeto para praticar desenvolvimento front-end com um problema real como ponto de partida.

## O que a aplicação faz

A calculadora recebe a roleta inicial e final, tarifa, quantidade de passagens que não entram como dinheiro no caixa e o valor apurado. A partir disso ela calcula:

- total registrado na roleta;
- quantidade considerada paga em dinheiro;
- receita esperada;
- diferença entre o esperado e o valor informado;
- indicação de caixa conferido, sobra ou falta.

Também incluí validações para evitar alguns erros de preenchimento, layout adaptado para celular e opção de tema escuro salva no navegador.

## Tecnologias

- HTML5
- CSS3
- JavaScript
- LocalStorage para preferência de tema

## Como testar

Baixe os arquivos e abra `index.html` no navegador. Não é necessário instalar dependências.

Um exemplo simples:

```text
Roleta inicial: 1000
Roleta final: 1100
Tarifa: 5,00
Passagens sem recebimento: 10
Dinheiro apurado: 450,00
```

Nesse cenário foram registrados 100 passageiros, 90 entram no cálculo em dinheiro e a receita esperada é R$ 450,00.

## Por que esse projeto está no meu portfólio

Durante minha experiência no transporte coletivo, fechamento e conferência faziam parte de uma rotina que eu já conhecia. Usei essa referência para praticar lógica, manipulação do DOM, validação de formulários, responsividade e organização de uma aplicação pequena em JavaScript.

## Próximas melhorias

Quero evoluir o projeto aos poucos. Algumas ideias são histórico de fechamentos, impressão de resumo e exportação dos dados para CSV.
