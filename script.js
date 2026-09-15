const campos = {
  inicial: document.querySelector('#roletaInicial'), final: document.querySelector('#roletaFinal'),
  tarifa: document.querySelector('#tarifa'), vales: document.querySelector('#vales'), dinheiro: document.querySelector('#dinheiro')
};
const resultado = document.querySelector('#resultado');
const erro = document.querySelector('#erro');
const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const chaveHistorico = 'historicoFechaBus';
let ultimoFechamento = null;

const numero = campo => Number(campo.value);
const lerHistorico = () => JSON.parse(localStorage.getItem(chaveHistorico) || '[]');
const gravarHistorico = itens => localStorage.setItem(chaveHistorico, JSON.stringify(itens));

function calcular() {
  erro.textContent = '';
  const inicial = numero(campos.inicial), final = numero(campos.final), tarifa = numero(campos.tarifa), vales = numero(campos.vales), dinheiro = numero(campos.dinheiro);

  if ([campos.inicial, campos.final, campos.tarifa, campos.dinheiro].some(c => c.value === '')) return falha('Preencha roletas, tarifa e o valor apurado no caixa.');
  if (inicial < 0 || final < 0 || tarifa <= 0 || vales < 0 || dinheiro < 0) return falha('Confira os valores informados. Não use números negativos.');
  if (final < inicial) return falha('A roleta final não pode ser menor que a inicial.');

  const passageiros = final - inicial;
  if (vales > passageiros) return falha('As passagens sem recebimento não podem superar o total registrado na roleta.');

  const pagantes = passageiros - vales;
  const receita = pagantes * tarifa;
  const diferenca = dinheiro - receita;
  ultimoFechamento = { id: Date.now(), data: new Date().toLocaleString('pt-BR'), inicial, final, tarifa, vales, passageiros, pagantes, receita, dinheiro, diferenca };

  document.querySelector('#passageiros').textContent = passageiros;
  document.querySelector('#pagantes').textContent = pagantes;
  document.querySelector('#receita').textContent = moeda.format(receita);
  document.querySelector('#apurado').textContent = moeda.format(dinheiro);
  document.querySelector('#diferenca').textContent = moeda.format(diferenca);

  const status = document.querySelector('#statusCaixa');
  const mensagem = document.querySelector('#mensagemDiferenca');
  if (Math.abs(diferenca) <= .009) { status.textContent = 'Caixa conferido'; mensagem.textContent = 'O valor apurado corresponde à receita esperada.'; }
  else if (diferenca > 0) { status.textContent = 'Sobra no caixa'; mensagem.textContent = `Há ${moeda.format(diferenca)} a mais em relação ao valor esperado.`; }
  else { status.textContent = 'Falta no caixa'; mensagem.textContent = `Há ${moeda.format(Math.abs(diferenca))} a menos em relação ao valor esperado.`; }

  resultado.classList.add('visivel');
  resultado.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function falha(texto) { erro.textContent = texto; resultado.classList.remove('visivel'); ultimoFechamento = null; }

function limpar() {
  Object.values(campos).forEach(c => c.value = ''); campos.vales.value = '0'; erro.textContent = '';
  resultado.classList.remove('visivel'); ultimoFechamento = null; campos.inicial.focus();
}

function salvar() {
  if (!ultimoFechamento) return;
  const historico = lerHistorico();
  historico.unshift(ultimoFechamento); gravarHistorico(historico); renderizarHistorico();
  document.querySelector('#salvar').textContent = 'Salvo';
  setTimeout(() => document.querySelector('#salvar').textContent = 'Salvar no histórico', 1200);
  ultimoFechamento = null;
}

function excluir(id) { gravarHistorico(lerHistorico().filter(item => item.id !== id)); renderizarHistorico(); }

function renderizarHistorico() {
  const historico = lerHistorico();
  const corpo = document.querySelector('#listaHistorico');
  corpo.innerHTML = '';
  document.querySelector('#historicoVazio').style.display = historico.length ? 'none' : 'block';
  document.querySelector('#tabelaHistorico').style.display = historico.length ? 'table' : 'none';
  historico.forEach(item => {
    const tr = document.createElement('tr');
    [item.data, item.passageiros, moeda.format(item.receita), moeda.format(item.dinheiro), moeda.format(item.diferenca)].forEach(valor => {
      const td = document.createElement('td'); td.textContent = valor; tr.appendChild(td);
    });
    const acao = document.createElement('td');
    const botao = document.createElement('button'); botao.className = 'excluir'; botao.textContent = 'Excluir'; botao.addEventListener('click', () => excluir(item.id));
    acao.appendChild(botao); tr.appendChild(acao); corpo.appendChild(tr);
  });
}

function exportarCSV() {
  const historico = lerHistorico();
  if (!historico.length) return alert('Ainda não há fechamentos para exportar.');
  const linhas = [['Data','Roleta inicial','Roleta final','Tarifa','Sem recebimento','Passageiros','Pagantes','Receita esperada','Apurado','Diferença'],
    ...historico.map(i => [i.data,i.inicial,i.final,i.tarifa,i.vales,i.passageiros,i.pagantes,i.receita,i.dinheiro,i.diferenca])];
  const csv = '\uFEFF' + linhas.map(l => l.map(v => `"${String(v).replaceAll('"','""')}"`).join(';')).join('\n');
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
  const a = document.createElement('a'); a.href = url; a.download = `fechabus-${new Date().toISOString().slice(0,10)}.csv`; a.click(); URL.revokeObjectURL(url);
}

document.querySelector('#calcular').addEventListener('click', calcular);
document.querySelector('#limpar').addEventListener('click', limpar);
document.querySelector('#salvar').addEventListener('click', salvar);
document.querySelector('#exportar').addEventListener('click', exportarCSV);
document.querySelector('#btnTema').addEventListener('click', () => { document.body.classList.toggle('dark'); localStorage.setItem('temaFechaBus', document.body.classList.contains('dark') ? 'dark' : 'light'); });
if (localStorage.getItem('temaFechaBus') === 'dark') document.body.classList.add('dark');
renderizarHistorico();
