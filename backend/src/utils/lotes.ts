// envia (ou executa) em paralelo com limite: no maximo "tamanho" ao mesmo tempo, um lote depois do outro. Usa
// Promise.allSettled, entao a falha de um item nao interrompe os outros nem derruba a resposta; quem chama olha o
// resultado de cada um (na mesma ordem dos itens). Usado nos avisos por e-mail aos inscritos de um evento
export const TAMANHO_LOTE_EMAIL = 10;

export async function emLotes<T, R>(itens: T[], tamanho: number, executar: (item: T) => Promise<R>): Promise<PromiseSettledResult<R>[]> {
  const resultados: PromiseSettledResult<R>[] = [];
  for (let inicio = 0; inicio < itens.length; inicio += tamanho) {
    resultados.push(...(await Promise.allSettled(itens.slice(inicio, inicio + tamanho).map(executar))));
  }
  return resultados;
}
