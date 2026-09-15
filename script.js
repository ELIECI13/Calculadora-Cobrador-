const campos = {
  inicial: document.querySelector('#roletaInicial'),
  final: document.querySelector('#roletaFinal'),
  tarifa: document.querySelector('#tarifa'),
  vales: document.querySelector('#vales'),
  dinheiro: document.querySelector('#dinheiro')
};

const resultado = document.querySelector('#resultado');
const erro = document.querySelector('#erro');
const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

function numero(campo) {
  return Number(campo.value);
}

function calcular() {
  erro.textContent = '';

  const inicial = numero(campos.inicial);
  const final = numero(campos.final);
  const tarifa = numero(campos.tarifa);
  const vales = numero(campos.vales);
  const dinheiro = numero(campos.dinheiro);

  if ([campos.inicial, campos.final, campos.tarifa, campos.dinheiro].some(campo => campo.value === '')) {
    erro.textContent = 'Preencha roletas, tarifa e o valor apurado no caixa.';
    resultado.classList.remove('visivel');
    return;
  }

  if (inicial < 0 || final < 0 || tarifa <= 0 || vales < 0 || dinheiro < 0) {
    erro.textContent = 'Confira os valores informados. Não use números negativos.';
    resultado.classList.remove('visivel');
    return;
  }

  if (final < inicial) {
    erro.textContent = 'A roleta final não pode ser menor que a inicial.';
    resultado.classList.remove('visivel');
    return;
  }

  const passageiros = final - inicial;

  if (vales > passageiros) {
    erro.textContent = 'As passagens sem recebimento não podem superar o total registrado na roleta.';
    resultado.classList.remove('visivel');
    return;
  }

  const pagantes = passageiros - vales;
  const receita = pagantes * tarifa;
  const diferenca = dinheiro - receita;

  document.querySelector('#passageiros').textContent = passageiros;
  document.querySelector('#pagantes').textContent = pagantes;
  document.querySelector('#receita').textContent = moeda.format(receita);
  document.querySelector('#apurado').textContent = moeda.format(dinheiro);
  document.querySelector('#diferenca').textContent = moeda.format(diferenca);

  const status = document.querySelector('#statusCaixa');
  const mensagem = document.querySelector('#mensagemDiferenca');
  const tolerancia = 0.009;

  if (Math.abs(diferenca) <= tolerancia) {
    status.textContent = 'Caixa conferido';
    mensagem.textContent = 'O valor apurado corresponde à receita esperada.';
  } else if (diferenca > 0) {
    status.textContent = 'Sobra no caixa';
    mensagem.textContent = `Há ${moeda.format(diferenca)} a mais em relação ao valor esperado.`;
  } else {
    status.textContent = 'Falta no caixa';
    mensagem.textContent = `Há ${moeda.format(Math.abs(diferenca))} a menos em relação ao valor esperado.`;
  }

  resultado.classList.add('visivel');
  resultado.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function limpar() {
  Object.values(campos).forEach(campo => campo.value = '');
  campos.vales.value = '0';
  erro.textContent = '';
  resultado.classList.remove('visivel');
  campos.inicial.focus();
}

document.querySelector('#calcular').addEventListener('click', calcular);
document.querySelector('#limpar').addEventListener('click', limpar);

document.querySelector('#btnTema').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('temaFechaBus', document.body.classList.contains('dark') ? 'dark' : 'light');
});

if (localStorage.getItem('temaFechaBus') === 'dark') {
  document.body.classList.add('dark');
}
