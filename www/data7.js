/* Marcos de desenvolvimento por fase. Cada bebê tem seu ritmo: é um guia de acompanhamento, não uma prova. */
(() => {
  const M = (fase, itens) => itens.map((t, i) => ({ id: fase + '-' + i, t }));
  window.MARCOS = {
    s1: M('s1', [
      'Mamou pela primeira vez', 'Fez o primeiro cocô (mecônio)', 'Foi para casa pela primeira vez', 'Tomou o primeiro banho em casa',
      'Foi à primeira consulta com o pediatra', 'Fez o teste do pezinho', 'O coto do umbigo caiu', 'Olhou nos meus olhos pela primeira vez',
    ]),
    m1: M('m1', [
      'Levantou a cabeça por alguns segundos de bruços', 'Seguiu meu rosto com o olhar', 'Segurou meu dedo com a mãozinha',
      'Reagiu a um barulho forte', 'Fez o primeiro passeio na rua', 'Passou uma noite com um intervalo maior de sono',
    ]),
    m2: M('m2', [
      'Deu o primeiro sorriso de verdade', 'Fez sons de "aaa" e "ooo"', 'Acompanhou um objeto com os olhos', 'Sustentou melhor a cabeça',
      'Deu a primeira risada', 'Levou a mão à boca de propósito', 'Virou a cabeça para o som da minha voz',
    ]),
    m4: M('m4', [
      'Rolou sozinha', 'Pegou um brinquedo de propósito', 'Deu uma gargalhada', 'Sentou com apoio', 'Começou a balbuciar',
      'Reagiu ao próprio nome', 'Experimentou a primeira papinha', 'Apoiou-se nos braços de bruços',
    ]),
    m7: M('m7', [
      'Sentou sozinha sem apoio', 'Engatinhou ou se arrastou', 'Fez o movimento de pinça com os dedos', 'Riu no esconde-esconde',
      'Nasceu o primeiro dentinho', 'Bateu palminhas', 'Passou o brinquedo de uma mão para a outra', 'Estranhou pessoas desconhecidas',
    ]),
    m10: M('m10', [
      'Ficou em pé com apoio', 'Deu os primeiros passos', 'Falou "mama" ou "papa"', 'Deu tchau com a mãozinha', 'Bebeu no copo',
      'Apontou para algo que queria', 'Comeu com as próprias mãos', 'Fez o primeiro aniversário 🎂',
    ]),
  };
})();
