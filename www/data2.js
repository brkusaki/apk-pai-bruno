/* Guias: antes do parto e maternidade. Fontes: Ministério da Saúde, SBP, OMS. Não substitui a equipe médica. */
(function () {
  const A = (id, cat, e, t, r, p, o) => window.GUIAS.push(Object.assign({ id, cat, e, t, r, p, lista: !!(o && o.l) }, o || {}));
  const MS = 'Ministério da Saúde e SBP';

  /* ---------- ANTES DO PARTO ---------- */
  A('bolsa-maternidade', 'pre', '🎒', 'Bolsa da maternidade: o que levar', 'Deixe pronta ao lado da porta a partir da 35ª semana.', [
    'Maíra: documentos, cartão da gestante e exames, camisola ou pijama que abre na frente, chinelo, roupa íntima confortável.',
    'Maíra: absorventes pós-parto, sutiã de amamentação, itens de higiene, carregador de celular, travesseiro de casa se ela quiser.',
    'Maya: 3 ou 4 mudas de roupa (bodies e macacões), meias, touca, manta e a roupa da saída.',
    'Maya: fraldas de recém-nascido (a maternidade costuma pedir ou fornecer, confirme).',
    'Confira com a maternidade o que ela já fornece e o que não permite levar.',
  ], { l: 1, fase: ['pre'], d: 'Deixe uma sacola separada com a roupa da saída e use um saco para roupa suja.', f: MS });

  A('bolsa-pai', 'pre', '🧳', 'Sua mala: o que o pai leva', 'Você vai ficar horas lá. Pense no seu conforto também.', [
    'Documento com foto, cartão do plano ou SUS e um pouco de dinheiro.',
    'Carregador e, se tiver, carregador portátil. Celular sem bateria no parto é ruim.',
    'Troca de roupa, agasalho (hospital costuma ser frio), chinelo e itens de higiene.',
    'Lanches e água. Ninguém ajuda se você passar mal de fome.',
    'Caderno ou bloco de notas para anotar orientações, horários e dúvidas.',
    'Fones de ouvido e uma playlist calma, se a Maíra gostar de música no parto.',
  ], { l: 1, fase: ['pre'], f: MS });

  A('documentos-parto', 'pre', '📄', 'Documentos para ter à mão', 'Separe numa pasta única e deixe junto da bolsa.', [
    'RG e CPF da Maíra e os seus.',
    'Cartão do plano de saúde ou cartão SUS e a guia de internação, se houver.',
    'Cartão da gestante com todos os exames e ultrassons, tipo sanguíneo e fator Rh.',
    'Plano de parto impresso, se vocês fizeram um.',
    'Certidão de casamento ou de união estável, se tiverem (ajuda no registro).',
    'Fotos dos documentos no celular, como segurança extra.',
  ], { l: 1, fase: ['pre'], f: MS });

  A('sinais-trabalho', 'pre', '⏱️', 'Sinais de trabalho de parto: quando ir', 'Siga a regra que o obstetra da Maíra deu. Na dúvida, ligue.', [
    'Contrações que vêm em ritmo regular, ficam mais fortes, mais longas e mais próximas e não passam com repouso ou banho.',
    'Anote a hora de início de cada contração e o intervalo entre elas. Dá para usar o app de contrações da Maíra.',
    'Perda do tampão mucoso (secreção espessa, às vezes com fio de sangue) é comum e pode vir dias antes. Sozinha, não é urgência.',
    'Quando bater o ritmo combinado com o obstetra, avise a maternidade, pegue a bolsa e vá.',
    'Dirija com calma. Chegar com tranquilidade é melhor que chegar correndo.',
  ], { fase: ['pre'], a: ['Vá imediatamente se a bolsa estourar (sai líquido), se houver sangramento vermelho vivo, se o bebê mexer bem menos que o normal, ou se a Maíra tiver dor forte constante, febre ou visão turva.'], f: MS });

  A('contracoes-ajudar', 'pre', '🫂', 'Como ajudar durante as contrações', 'Presença calma e atenta vale mais que qualquer técnica.', [
    'Fique perto, fale baixo e use frases curtas. Ela está concentrada.',
    'Respire junto com ela, devagar. Lembre de soltar o ar longamente.',
    'Ofereça água, um paninho frio na testa e ajude a trocar de posição quando ela quiser.',
    'Massagem na lombar com a base da mão ou pressão firme costuma aliviar. Pergunte onde e quanto.',
    'Banho morno de chuveiro ou bola de pilates, se a equipe liberar, ajudam muitas mulheres.',
    'Se ela disser coisas duras no meio da dor, não leve a sério. É o parto falando.',
  ], { fase: ['pre'], d: 'Não pergunte a cada minuto como ela está. Pergunte uma vez: ‘Quer que eu faça algo diferente?’ e espere.', f: MS });

  A('hora-de-ir', 'pre', '🚗', 'Checklist: saindo para a maternidade', 'Faça nesta ordem para não esquecer nada.', [
    'Avise a maternidade ou o obstetra que vocês estão indo.',
    'Pegue a bolsa da Maíra, a do bebê, a sua mala e a pasta de documentos.',
    'Confira carregador, chaves, carteira e o cartão do plano.',
    'Desligue fogão e feche a casa. Deixe um aviso para quem for cuidar dos outros filhos ou de animais.',
    'Cadeirinha já está instalada no carro para a volta.',
    'Mande uma mensagem única para a família combinada: ‘Estamos indo’.',
  ], { fase: ['pre'], f: MS });

  A('plano-parto', 'pre', '📝', 'Plano de parto: conversar com a equipe', 'Lista de preferências, não um contrato. Pode mudar.', [
    'Converse com a Maíra sobre o que ela quer: acompanhante, luz baixa, música, movimentação, analgesia.',
    'Inclua o pós-parto: pele a pele logo ao nascer, amamentar na primeira hora, quem corta o cordão, clampeamento tardio.',
    'Leve impresso e entregue à equipe na chegada. Pergunte o que a maternidade faz de rotina.',
    'Combine que, se algo mudar por segurança dela ou da Maya, a equipe decide e explica.',
    'Seu papel é defender as escolhas dela com respeito, e não brigar com a equipe.',
  ], { fase: ['pre'], d: 'A lei garante à gestante um acompanhante de livre escolha no pré-parto, no parto e no pós-parto imediato (Lei 11.108/2005).', f: MS });

  A('acompanhante-parto', 'pre', '🤝', 'Seu papel como acompanhante', 'Você é a pessoa de confiança dela naquela sala.', [
    'Pergunte à maternidade as regras: onde ficar, se pode filmar, trocas de acompanhante e horários.',
    'Conheça o plano de parto e saiba as três ou quatro coisas mais importantes para a Maíra.',
    'Seja a voz dela quando ela estiver ocupada: pergunte à equipe, explique, peça para esperar um instante.',
    'Cuide de você: coma, beba água e sente. Se ficar tonto, avise a equipe.',
    'Guarde a câmera. O mais importante é estar presente.',
  ], { fase: ['pre'], f: MS });

  A('ensaiar-caminho', 'pre', '🗺️', 'Ensaie o caminho até a maternidade', 'Num dia tranquilo, faça o trajeto uma vez.', [
    'Faça o caminho e veja quanto tempo leva de dia e de madrugada.',
    'Descubra qual é a entrada 24 horas e onde parar o carro.',
    'Mantenha o tanque com combustível suficiente nas últimas semanas.',
    'Tenha um plano B: quem pode levar vocês se o carro falhar. O SAMU é 192.',
    'Salve no celular o telefone da maternidade e do obstetra.',
  ], { fase: ['pre'], f: MS });

  A('cadeirinha-instalar', 'pre', '🚘', 'Instale a cadeirinha antes de ela nascer', 'A volta para casa é de carro. A cadeirinha precisa estar pronta.', [
    'Use bebê-conforto ou cadeirinha com selo do Inmetro, adequada ao peso. Nunca use de segunda mão sem saber se já bateu.',
    'Leia o manual com calma. Instale no banco de trás, de costas para o movimento.',
    'Aperte o cinto ou o Isofix até a cadeirinha mal se mexer. Ela deve balançar no máximo uns 2 a 3 cm.',
    'Ajuste a inclinação conforme o manual, para a cabeça do recém-nascido não cair para a frente.',
    'Peça uma conferência a um instrutor ou posto que faça checagem de cadeirinha.',
  ], { fase: ['pre'], a: ['Nunca leve o bebê no colo no carro, mesmo por um trajeto curto.'], f: 'Inmetro, SBP e Contran' });

  A('enxoval-essencial', 'pre', '🧺', 'Enxoval: o essencial (e o que dá para esperar)', 'Bebê cresce rápido. Compre o básico e o resto depois.', [
    'Roupas: 6 a 8 bodies, 5 a 6 macacões, meias, 2 toucas e mantas. Compre poucas peças do tamanho RN.',
    'Fraldas: poucas do tamanho RN e uma quantidade maior do P. Lenços sem perfume ou algodão e água morna.',
    'Sono: berço ou moisés, colchão firme, 2 ou 3 lençóis de elástico. Nada de travesseiro, protetor ou ninho.',
    'Banho e higiene: banheira, toalha com capuz, sabonete neutro, cortador de unha de bebê e termômetro.',
    'Casa: trocador firme, cadeirinha para o carro, mamadeira só se for usar (converse com a Maíra e o pediatra).',
  ], { l: 1, fase: ['pre'], d: 'Deixe espaço no orçamento para fraldas e para o que a Maya realmente usar. Muita coisa que vem de presente nunca é usada.', f: MS });

  A('quarto-preparar', 'pre', '🛏️', 'Preparar o espaço da Maya', 'Segurança e praticidade no quarto e na casa.', [
    'Berço ou moisés no quarto de vocês, fora de janelas, cortinas, cabos e prateleiras.',
    'Trocador em lugar firme e baixo, com tudo ao alcance da mão. Você nunca solta o bebê no trocador.',
    'Uma luz fraca e quente na troca da noite, para não acordar o bebê por completo.',
    'Temperatura confortável para adultos de roupa leve. Ventilador direto no bebê, não.',
    'Deixe os produtos de limpeza e remédios fora do alcance, mesmo que ela ainda não engatinhe.',
  ], { fase: ['pre'], f: MS });

  A('lavar-roupinhas', 'pre', '🧼', 'Lavar as roupinhas antes de usar', 'Tire o cheiro de loja e o excesso de produto.', [
    'Lave separado da roupa dos adultos, com sabão neutro ou de coco.',
    'Enxágue bem. Evite amaciante forte e produtos muito perfumados.',
    'Seque ao ar livre se possível e passe a ferro se a Maíra quiser.',
    'Retire etiquetas que podem arranhar a pele.',
    'Lave também mantas, lençóis e toalhas antes do primeiro uso.',
  ], { fase: ['pre'], f: 'Boas práticas pediátricas' });

  A('avisar-nascimento', 'pre', '📣', 'Combinar quem avisar e quando', 'Evite 40 mensagens com a Maíra no pós-parto.', [
    'Combinem uma lista curta de quem avisa primeiro: pais, irmãos, melhores amigos.',
    'Você é o porta-voz. Mande uma mensagem pronta com nome, hora e peso. Depois, silêncio.',
    'Deixe claro que visitas só depois que a Maíra disser que pode, e com hora marcada.',
    'Peça fotos só do que vocês quiserem postar. Pense na privacidade da Maya.',
    'Deixe o celular da Maíra no silencioso nas primeiras horas.',
  ], { fase: ['pre', 's1'], f: 'Boas práticas' });

  A('escolher-pediatra', 'pre', '👨‍⚕️', 'Escolher o pediatra', 'A primeira consulta é na primeira semana de vida.', [
    'Veja se o pediatra atende na maternidade, em consultório ou na UBS, e quanto tempo demora para marcar.',
    'Pergunte como funciona o contato fora do horário e o que ele considera emergência.',
    'Veja se o jeito dele combina com vocês: incentiva a amamentação? Explica sem pressa?',
    'Pergunte quando é o retorno e como ficam as vacinas e o acompanhamento do crescimento.',
    'Salve o telefone dele e o do pronto-socorro infantil mais próximo.',
  ], { fase: ['pre'], f: MS });

  A('amamentacao-antes', 'pre', '🤱', 'Aprender sobre amamentação antes de nascer', 'Quem se prepara sofre menos nos primeiros dias.', [
    'Assistam juntos a um vídeo ou curso curto sobre pega correta e posições.',
    'Procure uma consultora de amamentação ou o banco de leite da região antes de precisar.',
    'Entenda que as primeiras mamadas são pouco leite (colostro), e isso é suficiente.',
    'Combinem como você vai ajudar: trazer água, ajeitar almofadas, arrotar e trocar fralda.',
    'Saiba que amamentar não deve doer com a pega correta. Dor persistente é sinal para ajuda.',
  ], { fase: ['pre'], f: MS });

  A('custos-primeiro-ano', 'pre', '💳', 'Pensar nos custos do primeiro ano', 'Uma conversa antecipada evita estresse.', [
    'Liste as despesas recorrentes: fraldas, lenços, consultas, remédios, vacinas que não são do SUS, leite ou fórmula se precisar.',
    'Liste as despesas únicas: berço, carrinho, cadeirinha, banheira.',
    'Veja o que dá para pegar emprestado, receber de presente ou comprar usado (menos cadeirinha e colchão).',
    'Revise como o plano de saúde cobre o bebê e o prazo para incluí-lo.',
    'Combinem uma reserva pequena para imprevistos nos primeiros meses.',
  ], { fase: ['pre'], f: 'Boas práticas' });

  A('medo-nao-saber', 'pre', '😰', 'Medo de não saber o que fazer', 'Todo pai de primeira viagem sente. É normal.', [
    'Ninguém nasce sabendo. Aprende-se fazendo, errando um pouco e perguntando.',
    'Recém-nascidos são mais fortes do que parecem. Segure firme, apoie a cabeça e vá com calma.',
    'Escolha uma tarefa só sua desde o primeiro dia: banho, troca ou colocar para dormir.',
    'Quando bater o pânico, use este app: Guia, Urgência e a Rotina anotando tudo.',
    'Converse com outro pai. Ouvir que ele também sentiu medo alivia.',
  ], { fase: ['pre', 's1'], f: 'Boas práticas' });

  A('curso-primeiros-socorros', 'pre', '🆘', 'Faça um curso de primeiros socorros', 'Engasgo e parada respiratória em bebê, na prática.', [
    'Procure cursos de primeiros socorros para pais, muitas maternidades e hospitais oferecem.',
    'Treine as manobras de engasgo com bonecos. Ler não basta.',
    'Aprenda a reanimação de bebê (compressões e respirações) e quando ligar para o 192.',
    'Combine com a Maíra e com quem for ficar com a Maya para todos aprenderem.',
    'Deixe o número do SAMU (192) e do Disque-Intoxicação (0800 722 6001) em local visível.',
  ], { fase: ['pre'], f: 'SBP (Suporte Básico de Vida)' });

  A('pre-natal-final', 'pre', '🩺', 'Últimas consultas do pré-natal', 'A reta final tem consultas mais frequentes.', [
    'A gestação é considerada a termo a partir da 37ª semana. O bebê pode nascer a qualquer momento daí em diante.',
    'Vá junto às consultas se puder. É o momento de tirar as dúvidas com o obstetra.',
    'Pergunte: o que fazer se a bolsa romper, quando ir à maternidade, e qual a conduta se passar da data.',
    'Confira o cartão da gestante: exames, tipo sanguíneo, vacinas e anotações.',
    'Combine com o obstetra como será o contato nas últimas semanas.',
  ], { fase: ['pre'], f: MS });

  A('casa-pronta', 'pre', '🏠', 'Casa pronta para o pós-parto', 'Nas primeiras semanas ninguém tem energia para cozinhar.', [
    'Congele refeições simples e prepare uma lista de comidas fáceis.',
    'Abasteça a despensa com o básico e deixe a lista de compras à vista.',
    'Deixe a roupa de cama e as roupas do bebê lavadas e a casa limpa antes do parto.',
    'Combine quem faz o quê. Faz sentido você assumir a casa e a comida nas primeiras semanas.',
    'Aceite ajuda concreta: peça para parentes levarem comida ou fazerem compras, no lugar de visita.',
  ], { fase: ['pre'], f: 'Boas práticas' });

  A('ultima-semana', 'pre', '🌙', 'Reta final: cuidar da Maíra', 'A ansiedade aumenta. O seu papel é dar segurança.', [
    'Deixe o celular carregado, o carro abastecido e o telefone da maternidade à mão.',
    'Evite ficar muito longe ou viajar nas últimas semanas, avise o trabalho da possibilidade de ausência.',
    'Ouça sem tentar resolver. Ela pode estar com medo, cansaço e dor. Ajude com tarefas e massagem.',
    'Ajude a descansar: o sono vai ficar curto depois.',
    'Aproveitem o tempo a dois. Um jantar tranquilo ou um passeio curto valem muito.',
  ], { fase: ['pre'], f: 'Boas práticas' });

  A('irmaos-chegada', 'pre', '🧒', 'Preparar os filhos mais velhos da Maíra', 'A chegada da Maya muda a rotina de todos.', [
    'Converse com eles com palavras simples: vai chegar um bebê, ele vai chorar e precisar de muito cuidado.',
    'Deixe que participem: escolher uma roupinha, cantar para a barriga, ajudar a arrumar o quarto.',
    'Garanta um tempo exclusivo com cada um, mesmo que curto, todos os dias.',
    'Combine quem fica com eles no dia do parto e explique o que vai acontecer.',
    'Aceite que ciúme e regressão (voltar a pedir colo ou mamadeira) são normais. Acolha sem brigar.',
  ], { fase: ['pre', 's1'], d: 'Quando o bebê nascer, dê atenção a eles antes de falar do bebê. Peça ajuda como ‘ajudantes oficiais’.', f: 'SBP e boas práticas' });

  /* ---------- MATERNIDADE ---------- */
  A('chegada-maternidade', 'parto', '🏥', 'Chegando na maternidade: o que acontece', 'Triagem, avaliação e internação.', [
    'Na entrada, a Maíra faz a triagem: batimentos do bebê, pressão, toque para ver a dilatação.',
    'Entregue os documentos e o cartão da gestante. Você fica com a bolsa e a papelada.',
    'A equipe decide se ela interna ou se volta para casa. Pode ser que mandem esperar, e isso é normal.',
    'Pergunte o que fazer se for liberada e quando voltar.',
    'Se internar, pergunte sobre o quarto, quem pode ficar e como serão as informações.',
  ], { fase: ['pre'], f: MS });

  A('parto-normal-pai', 'parto', '🌸', 'Parto normal: o que esperar do pai', 'O trabalho de parto pode durar muitas horas.', [
    'Fase inicial: contrações irregulares e depois regulares. Pode demorar. Comam e descansem.',
    'Fase ativa: contrações fortes e frequentes. É quando mais precisam de você.',
    'Expulsivo: o bebê nasce em alguns minutos a horas. Siga as orientações da equipe.',
    'Depois do bebê, vem a placenta e a avaliação da Maíra.',
    'Você pode ficar ao lado da cabeça dela ou onde ela quiser. Sangue e líquidos são normais.',
  ], { fase: ['pre'], d: 'Se passar mal, sente-se e avise. Ninguém julga. Melhor que desmaiar no meio da sala.', f: MS });

  A('cesarea-pai', 'parto', '🏨', 'Cesárea: o que esperar do pai', 'A cirurgia é rápida e você pode ter um papel importante.', [
    'Antes: a Maíra recebe anestesia. Você aguarda e entra quando a equipe chamar, com roupa e touca.',
    'Durante: você fica ao lado da cabeça dela. O bebê nasce em poucos minutos, a cirurgia toda dura cerca de uma hora.',
    'Se tudo estiver bem, o bebê pode ir para o colo dela, para o pele a pele ou para um berço aquecido.',
    'Se a mãe estiver em recuperação e o bebê com você, faça pele a pele com ele no colo.',
    'Depois: a Maíra fica em observação, com dor, enjoo e cansaço. Você cuida do bebê e dela.',
  ], { fase: ['pre'], f: MS });

  A('primeira-hora', 'parto', '🌅', 'A primeira hora de vida', 'Momento de ouro: tente não ser interrompido.', [
    'Se mãe e bebê estiverem bem, o bebê deve ficar em contato pele a pele com a mãe logo após nascer.',
    'A primeira mamada acontece, de preferência, na primeira hora. Pergunte à equipe como ajudar.',
    'Pesagem, medidas e outros procedimentos podem esperar um pouco, se não houver urgência.',
    'Pergunte sobre o clampeamento tardio do cordão (esperar ao menos 1 minuto), que a OMS recomenda quando possível.',
    'Registre o momento sem atrapalhar. Tire fotos rápidas e depois guarde o celular.',
  ], { fase: ['pre', 's1'], f: 'OMS e Ministério da Saúde' });

  A('pele-a-pele-pai', 'parto', '🫶', 'Pele a pele com o pai', 'Quando a mãe não pode, você pode.', [
    'Tire a camisa e coloque o bebê só de fralda, de barriga para baixo no seu peito, com a cabeça de lado.',
    'Cubra as costas dele com uma manta leve. Mantenha as vias respiratórias livres: nariz e boca nunca cobertos.',
    'Sente-se numa posição segura, reclinada, e não durma com ele no colo.',
    'Fique sem celular. Observe cor e respiração do bebê o tempo todo.',
    'Faça de 30 minutos a 1 hora e repita em casa. Ajuda no vínculo e na calma dele.',
  ], { fase: ['pre', 's1'], a: ['Se o bebê ficar roxo, pálido, mole ou respirar com dificuldade, chame a equipe imediatamente.'], f: 'OMS e SBP' });

  A('exames-maternidade', 'parto', '🔬', 'Exames e testes do recém-nascido', 'Vários testes protegem a saúde dela nos primeiros dias.', [
    'Apgar: nota dada aos 1 e 5 minutos de vida. Ver como o bebê se adapta ao mundo.',
    'Teste do olhinho: detecta problemas nos olhos. Fazer ainda na maternidade.',
    'Teste do coraçãozinho: mede oxigênio no sangue e ajuda a achar cardiopatias. Feito entre 24 e 48 horas.',
    'Teste da orelhinha: triagem auditiva, ainda na maternidade ou até o primeiro mês.',
    'Teste do pezinho: feito entre o 3º e o 5º dia de vida. Se não fizeram na maternidade, marque na UBS.',
    'Teste da linguinha: avalia o freio da língua. Pode influenciar a mamada.',
  ], { l: 1, fase: ['s1'], d: 'Guarde os resultados na caderneta e leve ao pediatra na primeira consulta.', f: MS });

  A('vacinas-maternidade', 'parto', '💉', 'Vacinas e vitamina K na maternidade', 'A primeira proteção começa nas primeiras horas.', [
    'Vitamina K: dose única logo ao nascer, previne sangramentos.',
    'Hepatite B: a primeira dose é dada o mais cedo possível, nas primeiras 24 horas.',
    'BCG: protege contra formas graves de tuberculose. A bolinha no braço é esperada.',
    'Confira se tudo foi registrado na caderneta de vacinação antes de sair.',
    'Peça ao pediatra o calendário dos próximos meses.',
  ], { fase: ['s1'], f: 'Programa Nacional de Imunizações (Ministério da Saúde)' });

  A('aparencia-rn', 'parto', '👶', 'Como o recém-nascido é de verdade', 'Muita coisa assusta no começo, e é normal.', [
    'A cabeça pode estar alongada, moldada pelo parto. Volta ao normal em dias.',
    'Pele com vérnix (camada branca), descamação, manchas vermelhas e espinhas pequenas.',
    'Olhos inchados e bem fechados no começo. Alguns bebês parecem vesgos nas primeiras semanas.',
    'Genitais podem estar inchados nos meninos e nas meninas, e a mama pode ter um pouco de leite.',
    'Perda de peso de até cerca de 10% na primeira semana é esperada. Eles recuperam em torno de 10 a 14 dias.',
    'Respiração com pausas curtas e irregulares é comum, mas se parar por mais de 15 segundos ou ficar roxo, procure ajuda.',
  ], { fase: ['pre', 's1'], f: 'SBP e Ministério da Saúde' });

  A('reflexos-rn', 'parto', '✋', 'Reflexos do recém-nascido', 'Movimentos automáticos que o bebê já nasce sabendo.', [
    'Reflexo de busca e sucção: vira a cabeça e abre a boca quando algo toca a bochecha. É o que a faz mamar.',
    'Reflexo de preensão: fecha a mão em volta do seu dedo.',
    'Reflexo de Moro: abre os braços e dá um susto quando se sente cair ou ouve barulho alto.',
    'Reflexo de marcha: se segurá-la em pé, os pés parecem dar passos.',
    'Esses reflexos desaparecem nos primeiros meses. Se algum faltar, fale com o pediatra.',
  ], { l: 1, fase: ['s1', 'm1'], f: 'SBP' });

  A('estadia-hospital', 'parto', '🛌', 'Os dias na maternidade', 'Alojamento conjunto: Maya fica no quarto com vocês.', [
    'A equipe vai pesar o bebê, ver a icterícia, checar a mamada e acompanhar a Maíra.',
    'Pergunte tudo. Se algo não ficou claro, peça de novo, e anote.',
    'Peça ajuda na pega correta e na primeira troca de fralda. Aprenda com a enfermagem.',
    'Descansem em turnos. Quem não está com a Maya dorme.',
    'Combine as visitas com a equipe e os horários do hospital.',
  ], { fase: ['s1'], f: MS });

  A('alta-maternidade', 'parto', '🚪', 'Checklist da alta da maternidade', 'Antes de sair, confira tudo.', [
    'Caderneta da criança com os testes e vacinas registrados.',
    'Declaração de Nascido Vivo (DNV): necessária para a certidão de nascimento.',
    'Orientações sobre amamentação, curativos ou cuidados da mãe e retorno marcado.',
    'Consulta do bebê na primeira semana e teste do pezinho, se faltar.',
    'Cadeirinha instalada, roupa da saída pronta e documentos.',
    'Pergunte à equipe sobre sinais de alerta para a primeira noite em casa.',
  ], { l: 1, fase: ['s1'], f: MS });

  A('certidao-nascimento', 'parto', '📑', 'Certidão de nascimento', 'O primeiro documento da Maya.', [
    'Leve a Declaração de Nascido Vivo (DNV), seus documentos e os da Maíra ao cartório de registro civil.',
    'O registro é gratuito e deve ser feito em até 15 dias. Algumas maternidades têm cartório na unidade.',
    'Se vocês não são casados, o pai precisa comparecer ou assinar uma autorização. Confira no cartório.',
    'Escolha o nome com calma, mas dentro do prazo.',
    'Depois, peça mais vias, CPF e atualize o plano de saúde.',
  ], { fase: ['s1'], f: 'Lei de Registros Públicos e Ministério da Saúde' });

  A('plano-saude-bebe', 'parto', '🏷️', 'Incluir a Maya no plano de saúde', 'Existe um prazo para entrar sem carência.', [
    'Em geral, o recém-nascido pode ser incluído em até 30 dias do nascimento, sem carência. Confirme com o plano.',
    'Tenha em mãos certidão de nascimento ou DNV e os dados do titular.',
    'Faça isso na primeira semana, para não correr risco de perder o prazo.',
    'Guarde o protocolo da solicitação.',
    'Veja como ficam as consultas com o pediatra e as coberturas de pronto-socorro.',
  ], { fase: ['s1'], f: 'ANS (confirme as regras do seu plano)' });

  A('apoio-mae-maternidade', 'parto', '💛', 'Cuidar da Maíra na maternidade', 'Ela acabou de passar por um grande esforço.', [
    'Ofereça água e comida leve assim que a equipe liberar. Ajude a ir ao banheiro nas primeiras vezes.',
    'Ajude a levantar devagar, principalmente depois de cesárea. Evite puxar pelo braço.',
    'Arrume travesseiros para amamentar. Ajude a posicionar o bebê.',
    'Anote os horários de mamada, xixi e cocô do bebê (use a aba Rotina).',
    'Controle as visitas e proteja o descanso. Você é o filtro.',
    'Fique atento a dor forte, sangramento muito intenso, febre ou tontura e avise a equipe.',
  ], { fase: ['pre', 's1'], f: MS });

  A('visitas-hospital', 'parto', '🚪', 'Visitas na maternidade', 'Seja gentil, mas firme.', [
    'Combine horários curtos, de poucas pessoas por vez. Se a Maíra estiver cansada, adie.',
    'Quem está gripado, com tosse ou febre não entra.',
    'Todos lavam as mãos ou usam álcool gel antes de tocar no bebê.',
    'Sem beijos no rosto ou nas mãos dela. Ninguém pega o bebê sem permissão.',
    'Evite fotos com flash e comentários sobre o corpo da Maíra.',
  ], { fase: ['s1'], f: 'SBP' });

  A('primeira-noite', 'parto', '🌙', 'A primeira noite com a Maya', 'Pode ser a mais difícil: o bebê acorda muito.', [
    'Recém-nascido costuma mamar de 8 a 12 vezes em 24 horas, inclusive à noite.',
    'Ele pode ficar muito acordado na primeira noite. É um padrão comum.',
    'Revezem: um fica com o bebê por 3 a 4 horas enquanto o outro dorme.',
    'Mantenha o bebê no berço ou moisés de barriga para cima nos intervalos.',
    'Chame a enfermagem se tiver dúvida com a pega, a respiração ou a cor dela.',
  ], { fase: ['s1'], f: 'SBP' });
})();
