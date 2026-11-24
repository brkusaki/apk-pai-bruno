/* Guias: sono, choro, urgências e saúde. Fontes: SBP, Ministério da Saúde, Academia Americana de Pediatria. Não substitui o pediatra. Sem doses de remédios. */
(function () {
  const A = (id, cat, e, t, r, p, o) => window.GUIAS.push(Object.assign({ id, cat, e, t, r, p, lista: !!(o && o.l) }, o || {}));
  const MS = 'Ministério da Saúde e SBP';

  /* ---------- SONO ---------- */
  A('sono-rn-quanto', 'sono', '💤', 'Quanto o recém-nascido dorme', 'Muito, mas em blocos curtos.', [
    'Nas primeiras semanas, dorme em média 14 a 17 horas por dia, em períodos de 2 a 4 horas.',
    'Acorda para mamar, trocar e se acalmar. Isso é normal, não é sinal de problema.',
    'Não existe ‘dormir a noite toda’ nas primeiras semanas ou meses.',
    'Se dormir mais de 3 a 4 horas seguidas nas primeiras semanas, pergunte ao pediatra se deve acordar para mamar.',
    'Cuide do seu sono também: durma quando ela dormir.',
  ], { fase: ['s1', 'm1'], f: 'SBP e Academia Americana de Pediatria' });

  A('dia-e-noite', 'sono', '🌗', 'Ensinar a diferença entre dia e noite', 'O relógio biológico dela ainda está se formando.', [
    'De dia: luz natural, barulhos normais da casa e conversa durante as mamadas.',
    'À noite: luz fraca, voz baixa, sem brincar, fralda e volta ao berço.',
    'Expor a Maya à luz do dia pela manhã ajuda a regular o relógio interno.',
    'Não mantenha o quarto em silêncio total durante o dia, para ela não se acostumar.',
    'Em geral, entre 6 e 12 semanas a noite começa a se separar do dia.',
  ], { fase: ['m1', 'm2'], f: 'SBP' });

  A('sono-por-idade', 'sono', '🕰️', 'Quanto dormir em cada idade', 'Médias, não regras.', [
    '0 a 3 meses: 14 a 17 horas por dia, com muita variação.',
    '4 a 11 meses: 12 a 16 horas por dia, incluindo as sonecas.',
    '1 a 2 anos: 11 a 14 horas por dia, incluindo sonecas.',
    'Cada bebê é diferente. Se ela está bem-disposta e com bom humor, provavelmente está dormindo bem.',
    'Se o sono for muito curto, muito agitado ou com roncos fortes, converse com o pediatra.',
  ], { l: 1, fase: ['m2', 'm4', 'm7'], f: 'Academia Americana de Medicina do Sono' });

  A('rotina-sono', 'sono', '🧸', 'Ritual para dormir', 'Repetir ajuda o bebê a entender que é hora de dormir.', [
    'Escolha uma sequência curta e repita: banho morno, massagem, pijama, mamada e canção.',
    'Use luz baixa e voz calma. Sem TV, sem celular.',
    'Coloque-a no berço sonolenta, mas ainda acordada, depois dos 2 ou 3 meses, para ela aprender a pegar no sono.',
    'Mantenha horários parecidos todas as noites, sem rigidez.',
    'Pai pode assumir o ritual da noite. É uma ótima forma de criar vínculo.',
  ], { fase: ['m2', 'm4', 'm7'], f: 'SBP' });

  A('sonecas', 'sono', '☁️', 'Sonecas do dia', 'Dormir de dia ajuda a dormir melhor à noite.', [
    'No começo, as sonecas não têm horário. A Maya dorme quando precisa.',
    'Sinais de sono: esfrega os olhos, boceja, fica irritada, olha para o nada.',
    'Aproveite o sinal. Bebê muito cansado fica mais difícil de dormir.',
    'Depois dos 4 a 6 meses, sonecas ficam mais regulares: em geral 3 e depois 2 por dia.',
    'Não acorde para dormir mais cedo à noite, nem adie sonecas por muito tempo.',
  ], { fase: ['m2', 'm4'], f: 'SBP' });

  A('sono-ativo', 'sono', '🌀', 'Sono agitado: o bebê faz barulho dormindo', 'Muita coisa que parece estranha é normal.', [
    'Recém-nascidos têm longos períodos de sono ativo (REM): mexem olhos, caretas, gemidos, sorrisos e sustos.',
    'Respiração irregular com pausas curtas pode acontecer. Isso é comum.',
    'Não pegue no colo sempre que ela fizer barulho. Espere um pouco para ver se volta a dormir.',
    'Se ela estiver bem e respirando normalmente, deixe dormir.',
    'Se a respiração parar por mais de 15 segundos, ficar roxa ou com muito esforço, procure ajuda.',
  ], { fase: ['s1', 'm1'], f: 'SBP' });

  A('ruido-branco', 'sono', '🔊', 'Ruído branco ajuda?', 'Pode acalmar, se usado com cuidado.', [
    'Um som contínuo e baixo lembra o barulho do útero e acalma muitos bebês.',
    'Mantenha o volume baixo, parecido com um chuveiro à distância.',
    'Coloque o aparelho longe do berço, nunca dentro dele ou preso na grade.',
    'Não deixe ligado a noite toda em volume alto. Prefira um temporizador.',
    'Se ela dormir bem sem, não precisa.',
  ], { fase: ['s1', 'm1', 'm2'], f: 'Academia Americana de Pediatria' });

  A('enrolar-pano', 'sono', '🌯', 'Enrolar na mantinha (swaddle)', 'Pode ajudar nos primeiros dias, com limites.', [
    'Use manta fina e leve, sem apertar o peito. Os quadris e joelhos devem dobrar livremente.',
    'Sempre de barriga para cima. Nunca de lado ou de bruços.',
    'Não cubra o rosto. O pano não pode subir até o pescoço.',
    'Pare de enrolar assim que ela der sinais de querer rolar, por volta de 2 meses.',
    'Se ela se incomodar e chorar, solte. Alguns bebês preferem com os bracinhos livres.',
  ], { fase: ['s1', 'm1', 'm2'], a: ['Enrolar de forma muito apertada nas pernas pode prejudicar o quadril. Os joelhos precisam ficar livres.'], f: 'Academia Americana de Pediatria' });

  A('acordares-noite', 'sono', '🌃', 'Por que ela acorda tanto à noite', 'Faz parte do desenvolvimento.', [
    'Estômago pequeno e leite materno digerem rápido: ela precisa de comida a cada poucas horas.',
    'Ciclos de sono curtos: a cada 40 a 60 minutos ela passa por um momento de sono leve.',
    'Fome, fralda, calor, frio, gases e vontade de colo são causas comuns.',
    'Antes de pegar no colo, espere alguns minutos, pois muitos bebês voltam a dormir sozinhos.',
    'O sono vai se consolidar aos poucos ao longo do primeiro ano.',
  ], { fase: ['m2', 'm4'], f: 'SBP' });

  A('regressao-sono', 'sono', '🔄', 'Piora do sono por volta dos 4 meses', 'A famosa regressão: o sono muda e fica mais leve.', [
    'Por volta dos 3 a 5 meses o sono se reorganiza e o bebê passa a acordar mais.',
    'Pode durar algumas semanas. É sinal de desenvolvimento.',
    'Mantenha a rotina, o ritual e o ambiente escuro e calmo.',
    'Evite criar novos hábitos difíceis de desfazer, como só dormir no colo andando.',
    'Se durar muito, ou vier com febre, recusa de mamar ou choro diferente, converse com o pediatra.',
  ], { fase: ['m4'], f: 'SBP' });

  A('sono-m7-m12', 'sono', '🧗', 'Sono entre 7 e 12 meses', 'Novas habilidades podem atrapalhar.', [
    'Engatinhar, ficar em pé e falar podem fazer ela treinar no berço de madrugada.',
    'Medo de separação aparece. Ela pode chorar quando você sai do quarto.',
    'Mantenha o ritual e uma despedida curta e carinhosa.',
    'Passe pelo menos um tempo de qualidade com ela durante o dia.',
    'Dentes nascendo também mexem com o sono. Veja o guia de dentição.',
  ], { fase: ['m7', 'm10'], f: 'SBP' });

  A('cadeirinha-nao-dormir', 'sono', '🚘', 'Dormir na cadeirinha, no carrinho ou no colo', 'Cuidado com a posição da cabeça.', [
    'A cadeirinha é para viagem. Não é lugar de sono prolongado fora do carro.',
    'Se ela adormecer no trajeto, ao chegar passe para o berço ou moisés, de barriga para cima.',
    'Dormir sentada pode dobrar o pescoço para a frente e atrapalhar a respiração.',
    'No colo, fique acordado enquanto ela dorme. Se for dormir, coloque-a no berço.',
    'Evite o sofá e a poltrona para dormir com ela, principalmente se estiver muito cansado.',
  ], { fase: ['s1', 'm1', 'm2'], a: ['Nunca deixe o bebê dormindo sozinho no carro, nem por um minuto.'], f: 'Academia Americana de Pediatria' });

  A('treino-sono', 'sono', '🎓', 'Treinar o sono: o que considerar', 'Decisão em conjunto com o pediatra.', [
    'Antes de 4 a 6 meses, o bebê ainda precisa de mamadas à noite e de muito colo. Não é hora de treinar.',
    'Existem métodos mais graduais e outros mais firmes. Não há um único certo.',
    'Escolha só aquilo que vocês dois aceitam e que o pediatra apoia.',
    'Mantenha o ritual, o ambiente seguro e a barriga para cima.',
    'Se ela está doente, com dentes nascendo ou em mudança, adie.',
  ], { fase: ['m4', 'm7'], f: 'SBP' });

  A('mudar-de-quarto', 'sono', '🚪', 'Quando mudar a Maya para o quarto dela', 'Sem pressa.', [
    'A recomendação é dormir no quarto dos pais, em berço próprio, pelo menos nos primeiros 6 meses.',
    'Muitos especialistas sugerem até 1 ano, para reduzir risco de morte súbita.',
    'Quando for mudar, faça com calma: comece com sonecas no quarto novo.',
    'Use babá eletrônica se quiser, mas sem se apoiar só nela.',
    'Mantenha o quarto seguro, ventilado e sem objetos soltos.',
  ], { fase: ['m4', 'm7', 'm10'], f: 'Academia Americana de Pediatria e SBP' });

  /* ---------- CHORO ---------- */
  A('hora-bruxa', 'choro', '🌆', 'Choro do fim da tarde', 'Muito comum nas primeiras semanas.', [
    'Entre o fim da tarde e a noite, muitos bebês ficam mais irritados, sem causa clara.',
    'Confira o básico: fome, fralda, sono, calor e frio.',
    'Ajudam: colo, andar pela casa, balançar, shhh, canção, banho morno e ambiente calmo.',
    'Combinem um revezamento: quando um cansa, o outro assume.',
    'Costuma passar por volta dos 3 a 4 meses.',
  ], { fase: ['m1', 'm2'], f: 'SBP' });

  A('nunca-sacudir', 'choro', '⛔', 'Nunca sacuda um bebê', 'Pode causar lesão grave no cérebro em segundos.', [
    'Sacudir um bebê, mesmo por poucos segundos, pode causar danos graves ou morte.',
    'É muito mais comum do que se pensa, e geralmente acontece quando o adulto está no limite.',
    'Se sentir raiva ou desespero, coloque a Maya com segurança no berço, de barriga para cima, e saia do quarto por alguns minutos.',
    'Peça ajuda a alguém. Ligue para a Maíra, um parente ou amigo.',
    'Brincadeiras de jogar para o alto ou balançar muito rápido também são perigosas.',
    'Avise todos que cuidam dela: avós, babás, visitas.',
  ], { fase: ['s1', 'm1', 'm2'], a: ['Se o bebê foi sacudido, mesmo que pareça bem, procure o pronto-socorro imediatamente.'], f: 'SBP e Academia Americana de Pediatria' });

  A('pico-choro', 'choro', '📊', 'O pico de choro', 'Chorar mais nas primeiras semanas é esperado.', [
    'O choro costuma aumentar a partir das 2 semanas e atinge o pico entre 6 e 8 semanas.',
    'Depois diminui, e por volta de 3 a 4 meses fica bem menor.',
    'Pode haver choro que não passa com nada, e isso não é culpa sua.',
    'Se o bebê está bem, ganha peso e tem fraldas molhadas, é parte do desenvolvimento.',
    'Aceitar que nem sempre há uma solução reduz a frustração.',
  ], { fase: ['m1', 'm2'], f: 'SBP' });

  A('pai-no-limite', 'choro', '🧘', 'Quando você está no limite', 'Todo pai e toda mãe chega lá.', [
    'Coloque a Maya no berço de barriga para cima, com segurança.',
    'Vá para outro cômodo e respire fundo por 5 a 10 minutos. Ela fica bem.',
    'Lave o rosto, beba água, ouça uma música ou ligue para alguém.',
    'Volte quando estiver mais calmo. Se necessário, peça a Maíra ou a outra pessoa para assumir.',
    'Se tem pensamentos de machucar o bebê, procure ajuda profissional logo. CVV 188 atende 24 horas.',
  ], { fase: ['s1', 'm1', 'm2'], f: 'SBP' });

  A('colo-nao-estraga', 'choro', '🤗', 'Colo não estraga', 'O bebê não aprende a manipular, ele aprende a confiar.', [
    'Recém-nascidos não têm como ‘manhar’. Chorar é a única forma de pedir ajuda.',
    'Atender rápido, com carinho, ensina segurança e ajuda no desenvolvimento emocional.',
    'Você não precisa carregar o tempo todo. Alterne colo, berço, sling e brincadeira.',
    'Quando a Maya estiver mais velha, ela vai aprender a esperar um pouco naturalmente.',
    'Cuidado com o cansaço seu. Se precisar, peça ajuda.',
  ], { fase: ['s1', 'm1', 'm2'], f: 'SBP' });

  A('choro-sinal-alerta', 'choro', '⚠️', 'Quando o choro é sinal de doença', 'Fique atento ao que é diferente do normal.', [
    'Choro agudo, fraco, rouco, ou gemido contínuo.',
    'Choro que não para, mesmo depois de tudo, com ela pálida, mole ou com febre.',
    'Choro com vômitos repetidos, barriga muito dura, sangue nas fezes ou dificuldade para respirar.',
    'Recusa de mamar, muito sonolenta ou difícil de acordar.',
    'Se algo no choro parece ‘diferente’, confie no seu instinto e procure atendimento.',
  ], { fase: ['s1', 'm1', 'm2'], a: ['Febre em menores de 3 meses (38 °C ou mais) ou temperatura baixa (menos de 35,5 °C) é emergência.'], f: 'SBP' });

  A('cinco-s', 'choro', '🖐️', 'Cinco técnicas para acalmar', 'Imitam o útero e funcionam em muitos bebês.', [
    'Envolver: aperte levemente com uma manta fina e segura.',
    'Posição: segure de lado ou de bruços apenas no seu colo e acordada. Nunca para dormir assim.',
    'Shhh: um som contínuo perto do ouvido, bem alto no começo e mais baixo depois.',
    'Balançar: movimentos curtos, suaves e rítmicos, sem sacudir.',
    'Sucção: seio, chupeta (se usarem) ou dedo limpo e baixo.',
  ], { fase: ['s1', 'm1', 'm2'], f: 'Técnica do pediatra Harvey Karp' });

  /* ---------- URGÊNCIAS ---------- */
  A('engasgo-bebe', 'sos', '🫁', 'Engasgo em bebê menor de 1 ano', 'Aja rápido e com calma. Chame o 192.', [
    'Engasgo grave: o bebê não consegue chorar, tossir nem respirar, fica roxo. Grite por ajuda e peça para ligarem para o 192.',
    'Apoie o bebê de bruços no seu antebraço, com a cabeça mais baixa que o tronco, segurando firme o queixo.',
    'Dê 5 tapas firmes com a base da mão entre as omoplatas.',
    'Vire de barriga para cima, apoiado no outro antebraço, e faça 5 compressões no meio do peito, abaixo da linha dos mamilos.',
    'Repita 5 tapas e 5 compressões até o objeto sair ou até ela ficar inconsciente.',
    'Se ficar inconsciente: 192 no viva-voz e inicie a reanimação (veja o guia de RCP).',
  ], { fase: ['pre', 's1', 'm1', 'm4', 'm7'], a: ['Não faça a manobra de Heimlich (compressão da barriga) em menores de 1 ano. Não enfie o dedo às cegas na boca.'], d: 'Treine num curso de primeiros socorros. Ler não é o bastante.', f: 'SBP, Guia Prático de Suporte Básico de Vida (2025)' });

  A('rcp-bebe', 'sos', '❤️‍🩹', 'Bebê inconsciente e sem respirar: RCP', 'Ligue 192 e comece a reanimação.', [
    'Confirme: chame, toque nos pés e veja se ela reage. Olhe se respira.',
    'Ligue para o 192 (viva-voz). Se tiver mais alguém, peça para ligar.',
    'Coloque-a de costas em superfície firme. Comece as compressões no centro do peito com 2 dedos (ou com as mãos, se for treinado).',
    'Comprima rápido e firme: cerca de 100 a 120 por minuto, afundando cerca de um terço do peito (uns 4 cm).',
    'Se for treinado: alterne 30 compressões e 2 respirações boca a boca no nariz e na boca. Se não, só compressões.',
    'Continue até a ajuda chegar ou até ela reagir.',
  ], { fase: ['pre', 's1'], d: 'Faça um curso de primeiros socorros pediátricos. Pergunte na maternidade ou na UBS.', f: 'SBP e American Heart Association' });

  A('queimadura-bebe', 'sos', '🔥', 'Queimadura: o que fazer', 'Água corrente e atendimento.', [
    'Afaste o bebê da fonte do calor. Retire roupas ou fraldas que não estejam grudadas.',
    'Coloque a área em água corrente fria (não gelada) por 10 a 20 minutos.',
    'Cubra com pano limpo e úmido ou plástico filme sem apertar.',
    'Não passe pasta de dente, manteiga, café, clara de ovo ou gelo. Não estoure bolhas.',
    'Leve ao pronto-socorro em queimaduras em bebê, bolhas, rosto, mãos, genitais ou área grande.',
  ], { fase: ['m4', 'm7', 'm10'], f: 'SBP' });

  A('intoxicacao', 'sos', '☠️', 'Engoliu algo tóxico', 'Ligue antes de fazer qualquer coisa.', [
    'Tire o produto da boca e afaste a criança.',
    'Ligue para o Disque-Intoxicação: 0800 722 6001 (24 horas, gratuito) ou para o 192.',
    'Tenha à mão a embalagem, o nome do produto, a quantidade provável e a hora.',
    'Não provoque vômito. Não dê leite, óleo ou água à força.',
    'Se tiver contato na pele ou nos olhos, lave com muita água corrente e troque a roupa.',
    'Leve a embalagem ao pronto-socorro.',
  ], { fase: ['m4', 'm7', 'm10'], f: 'SBP e Anvisa' });

  A('queda-cabeca', 'sos', '🤕', 'Caiu e bateu a cabeça', 'Observe com atenção nas horas seguintes.', [
    'Acalme a criança e verifique se há sangramento, inchaço ou ferida.',
    'Compressa fria no local por alguns minutos. Se houver sangramento, comprima com um pano limpo.',
    'Fique atento por 24 horas: sonolência incomum, vômitos repetidos, irritabilidade, comportamento estranho.',
    'Qualquer queda em recém-nascido ou de lugar alto merece avaliação médica.',
    'Anote como foi o acidente e a altura da queda para contar ao médico.',
  ], { fase: ['m4', 'm7', 'm10'], a: ['Procure o pronto-socorro se houver desmaio, convulsão, vômitos repetidos, sangramento pelo nariz ou ouvido, moleira estufada ou choro que não passa.'], f: 'SBP' });

  /* ---------- SAÚDE ---------- */
  A('resfriado-bebe', 'saude', '🤧', 'Resfriado no bebê', 'Comum e geralmente leve, mas atenção em bebês pequenos.', [
    'Coriza, nariz entupido, espirros e tosse leve são típicos. Dura 7 a 10 dias.',
    'Continue amamentando, mais vezes se necessário, e ofereça líquidos.',
    'Limpe o nariz com soro fisiológico e deixe-a com a cabeça levemente elevada no colo.',
    'Não dê remédios, xaropes, chás ou mel por conta própria.',
    'Observe a respiração, o apetite e a febre.',
  ], { fase: ['m1', 'm2', 'm4'], a: ['Em menores de 3 meses, qualquer febre ou dificuldade de respirar exige avaliação imediata.'], f: 'SBP' });

  A('nariz-entupido', 'saude', '👃', 'Nariz entupido: o que ajuda', 'Bebês respiram principalmente pelo nariz.', [
    'Pingue 2 a 3 gotas de soro fisiológico em cada narina e espere um minuto.',
    'Limpe a entrada do nariz com algodão ou gaze. Se o pediatra indicar, use aspirador nasal com suavidade.',
    'Mantenha o ambiente ventilado e limpo, sem poeira ou fumaça.',
    'Elevar um pouco o tronco no colo ajuda. Não use travesseiro nem calço no berço.',
    'Não use sprays ou descongestionantes sem receita.',
  ], { fase: ['m1', 'm2', 'm4'], f: 'SBP' });

  A('tosse-bebe', 'saude', '😷', 'Tosse no bebê', 'A tosse é um mecanismo de defesa.', [
    'Tosse com catarro e coriza costuma ser infecção viral e melhora em alguns dias.',
    'Hidratação, nariz limpo, amamentação e ambiente sem fumaça ajudam.',
    'Nada de xaropes, mel ou chás sem indicação médica.',
    'Observe o ritmo da respiração, e se ela está mamando bem.',
    'Tosse por mais de uma ou duas semanas ou que piora à noite pede avaliação.',
  ], { fase: ['m1', 'm2', 'm4'], a: ['Respiração rápida, afundamento das costelas, chiado, gemido, lábios roxos ou recusa em mamar: pronto-socorro.'], f: 'SBP' });

  A('bronquiolite', 'saude', '🫁', 'Bronquiolite: sinais de alerta', 'Infecção viral comum em bebês, pode ser séria.', [
    'Começa como resfriado e depois evolui para tosse, chiado e respiração mais rápida.',
    'Observe: respiração rápida, afundamento entre as costelas, narinas abrindo, gemido.',
    'Dificuldade para mamar e menos fraldas molhadas são sinais de piora.',
    'Mantenha o nariz limpo e a hidratação. Evite fumaça e contato com doentes.',
    'Procure o pronto-socorro imediatamente se houver esses sinais.',
  ], { fase: ['m1', 'm2', 'm4'], a: ['Lábios ou pele azulados, pausas na respiração ou muita moleza: ligue 192.'], f: 'SBP' });

  A('diarreia-bebe', 'saude', '💩', 'Diarreia no bebê', 'O perigo maior é a desidratação.', [
    'Fezes muito líquidas e frequentes, com cheiro diferente. Bebês amamentados têm fezes soltas normalmente, a mudança é o que importa.',
    'Continue amamentando ou dando a fórmula habitual.',
    'Ofereça líquidos em pequenas quantidades e com frequência, como o pediatra indicar (soro de reidratação, se indicado).',
    'Cuide da pele para evitar assadura. Lave as mãos depois das trocas.',
    'Não dê remédio para parar a diarreia sem orientação.',
  ], { fase: ['m1', 'm2', 'm4', 'm7'], a: ['Sangue ou muco nas fezes, febre, vômitos, muita sonolência ou sinais de desidratação: procure atendimento.'], f: 'SBP' });

  A('desidratacao', 'saude', '🏜️', 'Sinais de desidratação', 'Mais comum com diarreia, vômito ou calor.', [
    'Boca e lábios secos, choro sem lágrimas.',
    'Poucas fraldas molhadas: menos de 4 a 6 por dia, ou xixi bem escuro.',
    'Moleira afundada e olhos fundos.',
    'Moleza, sonolência excessiva ou irritação.',
    'Mãos e pés frios, pele pálida.',
  ], { l: 1, fase: ['s1', 'm1', 'm2'], a: ['Se houver esses sinais, procure o pronto-socorro rapidamente.'], f: 'SBP' });

  A('vomitos', 'saude', '🤮', 'Vômitos no bebê', 'Diferente de cuspir um pouquinho.', [
    'Vômito é o conteúdo saindo com força, em volume maior.',
    'Mantenha na vertical, de lado, para não aspirar. Limpe a boca.',
    'Ofereça líquidos em pequenas quantidades, aos poucos, depois de um intervalo.',
    'Observe o número de fraldas molhadas e o estado geral.',
    'Anote a hora, o número de vezes e o aspecto.',
  ], { fase: ['s1', 'm1', 'm2', 'm4'], a: ['Vômito em jato, verde (bile), com sangue, barriga dura, febre ou muita sonolência: pronto-socorro.'], f: 'SBP' });

  A('constipacao', 'saude', '🚽', 'Intestino preso', 'Frequência não é o único critério.', [
    'Bebês amamentados podem ficar vários dias sem evacuar e ser normal, se as fezes são macias.',
    'O problema é fezes duras, em bolinhas, com dor e sangue.',
    'Com fórmula, fezes mais firmes são comuns, mas não devem ser secas.',
    'Massagem na barriga no sentido horário e movimentos de pedalar ajudam.',
    'Não use supositórios, chás ou laxantes sem indicação do pediatra.',
  ], { fase: ['m1', 'm2', 'm4', 'm7'], f: 'SBP' });

  A('sapinho', 'saude', '⚪', 'Sapinho (candidíase oral)', 'Manchas brancas na boca.', [
    'Placas brancas na língua, bochechas ou céu da boca, que não saem ao esfregar.',
    'Pode atrapalhar a mamada e causar dor ou irritação.',
    'Precisa ser avaliado pelo pediatra, que indica o tratamento.',
    'A Maíra também pode precisar de tratamento no mamilo.',
    'Lave com água fervida bicos de mamadeira, chupetas e mordedores.',
  ], { fase: ['m1', 'm2'], f: 'SBP' });

  A('olho-remela', 'saude', '👁️', 'Olho com remela', 'Muito comum, e quase sempre é o canal lacrimal entupido.', [
    'Remela amarelada ou olho lacrimejando sem vermelhidão forte costuma ser o canal lacrimal ainda estreito.',
    'Limpe com gaze e soro fisiológico ou água filtrada fervida e fria, do canto interno para o externo.',
    'Pode fazer massagem suave no canto do olho, se o pediatra orientar.',
    'Não use colírios, chás ou leite materno sem orientação.',
    'Olho vermelho, inchado, com muita secreção, febre ou luz incomodando: avalie logo.',
  ], { fase: ['s1', 'm1', 'm2'], f: 'SBP' });

  A('pele-seca', 'saude', '🧴', 'Pele seca e irritada', 'Cuide da barreira da pele.', [
    'Banho morno e rápido, sabonete neutro e sem excesso.',
    'Seque dando batidinhas e passe hidratante sem perfume logo depois.',
    'Evite tecidos sintéticos e roupas ásperas. Lave a roupa com sabão neutro.',
    'Mantenha as unhas curtas para evitar arranhões.',
    'Manchas vermelhas, coceira forte, bolhas ou feridas: leve ao pediatra.',
  ], { fase: ['m1', 'm2', 'm4'], f: 'SBP' });

  A('urticaria-alergia', 'saude', '🔴', 'Manchas na pele: alergia?', 'Alguns sinais exigem pressa.', [
    'Manchas vermelhas, elevadas e que coçam (urticária) podem surgir por alimentos, remédios ou infecções.',
    'Anote o que ela comeu ou usou antes e a hora das manchas.',
    'Evite novo contato com o suspeito e converse com o pediatra.',
    'Manchas com pontinhos roxos que não somem ao apertar com um copo também exigem avaliação urgente.',
    'Se houver inchaço no rosto ou boca, chiado, vômitos ou moleza: ligue 192.',
  ], { fase: ['m4', 'm7', 'm10'], a: ['Inchaço da boca ou do rosto, dificuldade para respirar ou palidez após comer ou tomar remédio é emergência.'], f: 'SBP' });

  A('aplv', 'saude', '🥛', 'Alergia ao leite de vaca (APLV)', 'Pode confundir com cólica.', [
    'Sinais: cólicas fortes e persistentes, sangue ou muco nas fezes, vômitos, eczema, chiado.',
    'Pode acontecer com bebês amamentados ou que usam fórmula.',
    'Não corte alimentos da dieta da mãe nem troque a fórmula sem orientação.',
    'O pediatra avalia, e pode indicar dieta da mãe ou fórmula especial.',
    'Leve ao consultório fotos das fezes e a rotina das mamadas.',
  ], { fase: ['m1', 'm2', 'm4'], f: 'SBP' });

  A('otite', 'saude', '👂', 'Dor de ouvido no bebê', 'Costuma vir depois de um resfriado.', [
    'Choro intenso, irritação, febre, bebê puxando a orelha ou não querendo mamar.',
    'O bebê não sabe dizer onde dói. Fique atento ao conjunto.',
    'Leve ao pediatra para examinar o ouvido. Não pingue nada no canal.',
    'Mamar na posição mais ereta ajuda a diminuir a dor.',
    'Siga o tratamento do pediatra até o fim.',
  ], { fase: ['m4', 'm7', 'm10'], f: 'SBP' });

  A('moleira', 'saude', '🫧', 'A moleira (fontanela)', 'Pode tocar com suavidade.', [
    'É o espaço mole no topo da cabeça onde os ossos ainda não se uniram. Fecha entre 9 e 18 meses.',
    'Você pode lavar e tocar com delicadeza. O cérebro tem proteção firme.',
    'A moleira pulsa e pode estar um pouco mais alta quando ela chora. Isso é normal.',
    'Moleira muito afundada pode ser desidratação, muito estufada com ela quieta pode ser grave.',
    'Em ambos os casos, procure atendimento.',
  ], { fase: ['s1', 'm1', 'm2'], f: 'SBP' });

  A('formato-cabeca', 'saude', '🥚', 'Cabeça achatada de um lado', 'Prevenível e quase sempre tratável.', [
    'Ossos do crânio são moles. Ficar sempre na mesma posição pode achatar um lado.',
    'Varie a posição da cabeça ao dormir, mas sempre de barriga para cima.',
    'Coloque-a de bruços acordada, com supervisão, várias vezes ao dia.',
    'Alterne o lado em que ela é segurada e o lado do berço voltado para o quarto.',
    'Se notar assimetria marcada, peça avaliação ao pediatra.',
  ], { fase: ['m1', 'm2', 'm4'], f: 'Academia Americana de Pediatria e SBP' });

  A('hernia-umbilical', 'saude', '🔘', 'Umbigo saltado (hérnia umbilical)', 'Costuma fechar sozinha.', [
    'Um volume mole no umbigo, que aparece ao chorar ou fazer força, é comum.',
    'Em geral fecha sozinha até os 3 a 5 anos, sem tratamento.',
    'Não use moeda, faixa ou esparadrapo para ‘empurrar’.',
    'Mostre ao pediatra na consulta.',
    'Se ficar duro, vermelho, doloroso ou com vômitos, é urgência.',
  ], { fase: ['m1', 'm2', 'm4'], f: 'SBP' });

  A('remedios-bebe', 'saude', '💊', 'Remédios: regras para a Maya', 'Nunca por conta própria.', [
    'Só dê remédio que o pediatra receitou, na dose e no horário indicados.',
    'Use a seringa dosadora ou o copinho que acompanha, nunca colher de cozinha.',
    'Confira o nome, a concentração e a validade antes de dar.',
    'Guarde os remédios fora do alcance, em local trancado, e anote os horários que deu.',
    'Nunca dê remédio de adulto, chás ou ‘receitas de família’.',
  ], { fase: ['s1', 'm1', 'm2'], f: 'SBP' });

  A('farmacinha', 'saude', '🧰', 'Farmacinha básica para o bebê', 'Tenha o essencial, sem estoque.', [
    'Termômetro digital e seringa dosadora.',
    'Soro fisiológico, gaze, algodão e cotonetes (só para limpar fora do ouvido).',
    'Pomada ou creme de barreira para assadura, e um hidratante sem perfume.',
    'Esparadrapo, curativos, tesourinha de ponta redonda.',
    'Lista de telefones: pediatra, 192, Disque-Intoxicação (0800 722 6001), maternidade.',
    'Remédios, apenas os que o pediatra indicar.',
  ], { l: 1, fase: ['pre', 's1'], f: 'SBP' });

  A('consultas-pediatra', 'saude', '📅', 'Calendário de consultas do bebê', 'Acompanhamento regular é saúde.', [
    'Primeira semana de vida (até 7 dias): avalia peso, icterícia, mamada e testes.',
    'Depois: 1 mês, 2, 4, 6, 9, 12, 18 e 24 meses, em geral. O pediatra pode pedir retornos extras.',
    'Leve a caderneta, o cartão de vacina, suas dúvidas anotadas e o registro da aba Rotina.',
    'Pergunte sobre alimentação, sono, desenvolvimento e vacinas.',
    'Peça ao pediatra as orientações por escrito.',
  ], { l: 1, fase: ['s1', 'm1', 'm2'], f: MS });

  A('vacinas-reacoes', 'saude', '💉', 'Vacinas: reações e cuidados', 'Esperar um pouco de desconforto é normal.', [
    'Dor, vermelhidão ou um caroço no local, febre baixa e irritação por 1 a 2 dias são esperadas.',
    'Compressa fria no local ajuda. Amamente mais vezes e dê muito colo.',
    'Não dê remédio antes da vacina ‘para prevenir’. Só se o pediatra indicar.',
    'Mantenha a caderneta em dia e peça o calendário do mês seguinte.',
    'A Maíra já usa o app de vacinas. Combine os dias com ela.',
  ], { fase: ['s1', 'm2', 'm4', 'm7'], a: ['Febre alta, choro inconsolável por mais de 3 horas, convulsão, moleza ou inchaço da boca e do rosto: procure atendimento.'], f: 'Programa Nacional de Imunizações' });

  A('vacinas-pai', 'saude', '🛡️', 'Suas vacinas como pai', 'Proteger você é proteger a Maya.', [
    'Coqueluche é perigosa para recém-nascidos. Confirme com o posto se você precisa de reforço da dTpa.',
    'Gripe: a vacina anual protege você e quem convive com bebê.',
    'Mantenha também em dia as demais vacinas do adulto, como hepatite B, tríplice viral e covid-19.',
    'Peça a avós e cuidadores que também confirmem as vacinas.',
    'Se estiver doente, lave as mãos e use máscara perto dela.',
  ], { fase: ['pre', 's1'], f: 'Ministério da Saúde' });

  A('suplementos-bebe', 'saude', '🟠', 'Vitamina D e ferro', 'Só com orientação do pediatra.', [
    'Muitos pediatras indicam vitamina D desde as primeiras semanas e ferro a partir de certa idade.',
    'A necessidade e a dose variam por bebê. Pergunte na primeira consulta.',
    'Use a gotinha com a medida do frasco, sempre a mesma hora do dia.',
    'Não aumente a dose por conta própria e guarde longe do alcance dela.',
    'Anote na aba Diário ou nas notas do celular quando começou.',
  ], { fase: ['s1', 'm1', 'm4'], f: 'SBP' });

  A('dentes-nascendo', 'saude', '🦷', 'Dentes nascendo', 'Em geral por volta dos 6 meses.', [
    'Sinais: baba, gengiva inchada, mordedura, irritação e sono ruim.',
    'Ofereça mordedor limpo e frio (da geladeira, não do freezer) ou um pano limpo e gelado.',
    'Massageie a gengiva com o dedo limpo.',
    'Febre alta, diarreia e vômitos não são causados pelos dentes. Procure o pediatra.',
    'Não use gel ou pomadas anestésicas sem indicação.',
  ], { fase: ['m4', 'm7'], f: 'SBP' });
})();
