# FechaBus — Calculadora de fechamento de caixa

Aplicação web que criei a partir de uma situação que conheço da rotina do transporte coletivo: conferir os números da roleta e o valor esperado no fechamento do caixa.

**Demo online:** https://elieci13.github.io/Calculadora-Cobrador-/

A proposta não é substituir um sistema de bilhetagem. É uma ferramenta simples de conferência e, ao mesmo tempo, um projeto para praticar desenvolvimento front-end com um problema real como ponto de partida.

## O que a aplicação faz

A calculadora recebe roleta inicial e final, tarifa, quantidade de passagens que não entram como dinheiro no caixa e o valor apurado. A partir disso calcula:

- total registrado na roleta;
- quantidade considerada paga em dinheiro;
- receita esperada;
- diferença entre o esperado e o valor informado;
- indicação de caixa conferido, sobra ou falta.

Os fechamentos podem ser salvos no próprio navegador. O histórico permite excluir registros e exportar os dados em CSV.

## Tecnologias

- HTML5
- CSS3
- JavaScript
- LocalStorage
- manipulação do DOM
- geração de arquivo CSV no navegador

## Como testar

A forma mais rápida é acessar a demo online. Também é possível baixar os arquivos e abrir `index.html` diretamente no navegador, sem instalar dependências.

Exemplo:

```text
Roleta inicial: 1000
Roleta final: 1100
Tarifa: 5,00
Passagens sem recebimento: 10
Dinheiro apurado: 450,00
```

Nesse cenário foram registrados 100 passageiros, 90 entram no cálculo em dinheiro e a receita esperada é R$ 450,00.

## Por que esse projeto está no meu portfólio

Durante minha experiência no transporte coletivo, fechamento e conferência faziam parte de uma rotina que eu já conhecia. Usei essa referência para praticar lógica, manipulação do DOM, validação de formulários, armazenamento local, responsividade e organização de uma aplicação pequena em JavaScript.

## Próximas melhorias

O projeto ainda pode receber melhorias como impressão de resumo, filtros no histórico e identificação da linha ou jornada.
