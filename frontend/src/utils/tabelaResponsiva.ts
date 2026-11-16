// tabelas responsivas (classe .tabela-responsiva, CSS em styles/global.css): em telas de ate 900px cada linha vira
// um cartao, com cada campo no formato "Rotulo: valor". O rotulo e o texto do cabecalho (th) da coluna, copiado
// aqui para o atributo data-label de cada celula (td) — o CSS mostra com ::before. Fica num lugar so, para nenhuma
// tela precisar repetir os rotulos: um observador acompanha as tabelas que aparecem ou mudam (troca de tela,
// pagina, filtro) e rotula de novo. Celula que ocupa mais de uma coluna (aviso de lista vazia) fica sem rotulo

const SELETOR = "table.tabela-responsiva";

function rotularTabela(tabela: HTMLTableElement) {
  const rotulos = Array.from(tabela.querySelectorAll("thead th")).map((th) => th.textContent?.trim() ?? "");
  tabela.querySelectorAll("tbody tr").forEach((linha) => {
    let coluna = 0;
    Array.from(linha.children).forEach((celula) => {
      const largura = (celula as HTMLTableCellElement).colSpan || 1;
      const rotulo = largura > 1 ? "" : (rotulos[coluna] ?? "");
      if (celula.getAttribute("data-label") !== rotulo) celula.setAttribute("data-label", rotulo);
      coluna += largura;
    });
  });
}

export function rotularTabelasResponsivas(raiz: ParentNode = document) {
  raiz.querySelectorAll<HTMLTableElement>(SELETOR).forEach(rotularTabela);
}

// chamado uma vez, ao abrir o app. Junta as mudancas num quadro de animacao (no maximo uma passada por quadro). So
// observa elementos entrando e saindo, nao atributos: gravar o data-label nao dispara o observador de novo
export function observarTabelasResponsivas(): () => void {
  let agendado = false;
  const rotular = () => {
    agendado = false;
    rotularTabelasResponsivas();
  };
  const observador = new MutationObserver(() => {
    if (agendado) return;
    agendado = true;
    requestAnimationFrame(rotular);
  });
  observador.observe(document.body, { childList: true, subtree: true, characterData: true });
  rotularTabelasResponsivas();
  return () => observador.disconnect();
}
