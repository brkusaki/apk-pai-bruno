/* Guias: dia a dia, amamentação e alimentação complementar. Fontes: Guia Alimentar para Crianças Brasileiras Menores de 2 Anos (MS), SBP, OMS. */
(function () {
  const A = (id, cat, e, t, r, p, o) => window.GUIAS.push(Object.assign({ id, cat, e, t, r, p, lista: !!(o && o.l) }, o || {}));
  const MS = 'Ministério da Saúde e SBP';
  const GA = 'Guia Alimentar para Crianças Brasileiras Menores de 2 Anos (Ministério da Saúde)';

  /* ---------- DIA A DIA ---------- */
  A('bolsa-passeio', 'dia', '👜', 'Bolsa de passeio: o que levar', 'Sempre pronta, sempre reposta.', [
    'Fraldas (uma a cada duas horas de passeio, mais uma extra), lenços ou algodão e um saquinho para fralda suja.',
    'Troca de roupa completa para a Maya e uma blusa extra para você.',
    'Manta fina, paninho de boca e uma touca ou chapéu se for ao sol.',
    'Mamadeira e fórmula em porções, se usar. Ou local tranquilo para a Maíra amamentar.',
    'Creme de assadura, álcool gel e termômetro. Telefone do pediatra e documentos do plano.',
  ], { l: 1, fase: ['s1', 'm1'], d: 'Reponha a bolsa assim que chegar em casa. Assim ela está sempre pronta.', f: MS });

  A('sling-canguru', 'dia', '🎒', 'Sling e canguru: usar com segurança', 'Carregar junto ajuda, desde que a respiração esteja livre.', [
    'Lembre do TICKS: apertado, à vista, perto o bastante para beijar, queixo longe do peito e costas apoiadas.',
    'O rosto do bebê nunca fica coberto pelo tecido nem pressionado contra seu corpo.',
    'O queixo não pode encostar no peito. Dois dedos de espaço entre queixo e peito.',
    'Ajuste com ele fora do carregador e teste inclinando para a frente. Ele não deve se mexer nem cair.',
    'Fique atento ao pescoço dele. Vire a cabeça para o lado quando dormir, sem cobrir.',
    'Não cozinhe, nem dirija, nem se incline sem proteger o bebê com a mão.',
  ], { fase: ['s1', 'm1', 'm2'], a: ['Se o bebê estiver roxo, mole ou respirando com dificuldade, retire-o do carregador na hora e chame ajuda.'], f: 'Safe Kids e SBP' });

  A('carrinho-passeio', 'dia', '🛒', 'Passeio de carrinho: cuidados', 'Segurança e conforto.', [
    'Use sempre o cinto e trave os freios ao parar.',
    'Nos primeiros meses, use a posição deitada ou o moisés, nunca sentado.',
    'Não pendure bolsas pesadas no guidão (pode virar o carrinho).',
    'Cuide da cobertura contra sol e vento, mas deixe a ventilação livre. Nunca cubra todo o carrinho com pano.',
    'Cuidado com calçadas e rampas. Nunca solte o carrinho em declive.',
  ], { fase: ['m1', 'm2', 'm4'], f: 'SBP' });

  A('assadura', 'dia', '🍑', 'Assadura: prevenir e tratar', 'Muito comum. Trocas frequentes resolvem a maior parte.', [
    'Troque a fralda assim que estiver suja, de dia e de noite, se estiver acordada.',
    'Limpe com algodão e água morna ou lenço sem perfume. Seque bem, sem esfregar.',
    'Passe uma camada de creme de barreira (como os com óxido de zinco) a cada troca.',
    'Deixe a pele respirar sem fralda por alguns minutos, em local aquecido.',
    'Evite talco, que pode irritar. Não use pomada sem saber o que é.',
  ], { fase: ['s1', 'm1', 'm2'], a: ['Procure o pediatra se houver bolhas, feridas, pus, febre, manchas vermelhas com pontinhos ou se não melhorar em 2 ou 3 dias.'], f: 'SBP' });

  A('crosta-lactea', 'dia', '🌼', 'Casquinhas na cabeça (crosta láctea)', 'Parece feio, mas não faz mal.', [
    'São escamas amareladas no couro cabeludo. É comum até os primeiros meses.',
    'Lave a cabeça com sabonete neutro e massageie com os dedos, sem esfregar com força.',
    'Pode amolecer as crostas com um óleo vegetal ou mineral antes do banho, como o pediatra orientar, e remover com pente macio.',
    'Não arranque as crostas com unha.',
    'Se avermelhar, formar feridas ou espalhar pelo rosto e dobrinhas, peça avaliação.',
  ], { fase: ['m1', 'm2'], f: 'SBP' });

  A('olhos-nariz-ouvidos', 'dia', '👁️', 'Limpar olhos, nariz e ouvidos', 'Menos é mais. Nada de cotonete dentro.', [
    'Lave as mãos. Use gaze ou algodão limpo e úmido com soro fisiológico ou água filtrada fervida e fria.',
    'Olhos: limpe do canto interno para o externo, uma gaze para cada olho.',
    'Nariz: pingue algumas gotas de soro fisiológico e limpe só a entrada com algodão. Não enfie nada dentro.',
    'Ouvidos: só a parte externa e a dobrinha atrás da orelha. Não use cotonete dentro do canal.',
    'Remela abundante, amarela ou olhos vermelhos exigem avaliação do pediatra.',
  ], { fase: ['s1', 'm1'], f: 'SBP' });

  A('genitais-higiene', 'dia', '🚿', 'Higiene íntima da Maya', 'Delicadeza e sempre de frente para trás.', [
    'A cada troca, limpe da frente para trás para não levar fezes à vagina e à uretra.',
    'Use água morna e algodão, sem sabonete dentro. Seque com leveza.',
    'Pode haver uma secreção esbranquiçada ou um pouco de sangue nos primeiros dias, por causa dos hormônios da mãe. Passa sozinho.',
    'Vermelhidão intensa, mau cheiro ou secreção com pus devem ser vistos pelo pediatra.',
  ], { fase: ['s1', 'm1'], f: 'SBP' });

  A('chupeta', 'dia', '🍼', 'Chupeta: usar ou não', 'Decisão sua e da Maíra, com informação.', [
    'O Ministério da Saúde recomenda evitar a chupeta, principalmente nas primeiras semanas, para não atrapalhar a amamentação.',
    'Se for usar, espere a amamentação estar bem estabelecida (em geral umas 3 a 4 semanas) e ofereça só na hora de dormir ou quando for preciso acalmar.',
    'Nunca passe mel, açúcar ou adoçante na chupeta. Não prenda por fita ou cordão no pescoço.',
    'Lave e troque a chupeta com frequência e não a ‘limpe’ com a boca.',
    'Planeje o desmame da chupeta antes de 1 ano a 2 anos, para proteger os dentes.',
  ], { fase: ['m1'], f: 'Ministério da Saúde e SBP' });

  A('primeira-vez-sozinho', 'dia', '🦸', 'Primeira vez sozinho com a Maya', 'Você consegue. Prepare-se uma vez.', [
    'Deixe tudo pronto: fraldas, lenços, roupa, mamadeira ou leite ordenhado, manta e um lugar seguro para ela deitar.',
    'Salve no celular: o pediatra, a maternidade, a Maíra, e o 192.',
    'Combine com a Maíra a rotina do bebê e o horário da próxima mamada.',
    'Vá com calma. Ela pode chorar, e você não está fazendo nada errado. Use o guia Choro.',
    'Registre tudo na aba Rotina. Assim, a Maíra sabe o que foi feito quando voltar.',
    'Peça à Maíra que se desligue de verdade. Ela precisa do descanso.',
  ], { fase: ['s1', 'm1'], f: 'Boas práticas' });

  A('primeiros-passeios', 'dia', '🌳', 'Primeiros passeios com a Maya', 'Ar livre é bom. Lugar cheio, nem tanto.', [
    'Comece com passeios curtos ao ar livre, em lugar arejado, num horário de sol ameno.',
    'Evite locais fechados e lotados (shopping, mercado, transporte cheio) nas primeiras semanas.',
    'Vista com camadas, como você, mais uma. Proteja do sol com sombra e chapéu.',
    'Ninguém doente chega perto. Peça às pessoas que não toquem no rosto e nas mãos dela.',
    'Volte se ela ficar muito irritada, com calor ou com fome.',
  ], { fase: ['s1', 'm1'], f: 'SBP' });

  A('viajar-bebe', 'dia', '✈️', 'Viajar com a Maya', 'Planeje com folga. Pare mais vezes.', [
    'De carro: cadeirinha obrigatória, paradas a cada 2 horas para trocar, alimentar e esticar.',
    'Leve mais fraldas e roupas do que você acha que precisa, mais uma toalha e manta.',
    'De avião: confirme o limite de idade da companhia, leve certidão ou documento e deixe a mamada para a decolagem e o pouso.',
    'Converse com o pediatra antes de viagens longas e nos primeiros meses.',
    'Procure saber onde há atendimento pediátrico no destino.',
  ], { fase: ['m2', 'm4', 'm7'], f: 'SBP' });

  A('calor-frio', 'dia', '🌤️', 'Calor e frio: como proteger', 'O bebê não regula bem a temperatura.', [
    'Verifique a temperatura pelo pescoço e pela barriga (não pelas mãos, que são frias).',
    'No calor: roupa leve de algodão, quarto ventilado, banho morno, e mamar mais vezes. Nunca deixe a Maya dentro do carro parado.',
    'No frio: camadas finas e gorro, mas sem abafar. Retire uma camada se suar.',
    'Evite que o ar-condicionado ou o ventilador sopre direto nela.',
    'Quarto confortável para um adulto de roupa leve (algo entre 22 e 26 °C costuma ser adequado).',
  ], { fase: ['s1', 'm1', 'm2'], f: 'SBP' });

  A('animais-casa', 'dia', '🐶', 'Animais de estimação e o bebê', 'Dá para conviver bem com preparo.', [
    'Antes do parto, leve uma roupa ou manta do bebê para o animal cheirar. Reforce que ele é parte da família.',
    'Mantenha vacinas e vermífugo em dia, unhas aparadas e banho em dia.',
    'Nunca deixe o bebê sozinho com o animal, nem dormindo. Nem por um minuto.',
    'O berço fica fora do alcance de gatos e cachorros.',
    'Dê atenção ao animal também. Ele pode estranhar e ficar ciumento.',
  ], { fase: ['pre', 's1'], f: 'SBP' });

  A('higiene-casa', 'dia', '🧴', 'Higiene em casa com bebê', 'Simples e consistente vence perfeito.', [
    'Lave as mãos ao chegar da rua e antes de tocar na Maya. Álcool gel quando não tiver pia.',
    'Troque a roupa e tire os sapatos na porta, principalmente se vier de hospital ou ambiente cheio.',
    'Limpe superfícies que ela toca com pano úmido. Não precisa de produtos fortes.',
    'Lave chupetas, mordedores e brinquedos com água e sabão regularmente.',
    'Quem estiver doente usa máscara, lava as mãos e evita beijar e pegar a bebê.',
  ], { fase: ['s1', 'm1'], f: 'SBP' });

  A('rotina-dia', 'dia', '🗓️', 'Montar uma rotina flexível', 'Rotina ajuda os pais, e o bebê se acostuma aos poucos.', [
    'Nos primeiros dois meses, quem manda é o bebê: mamar, dormir, trocar. Observe os padrões.',
    'Comece a marcar na aba Rotina para ver horários que se repetem.',
    'A partir do 2º ou 3º mês, tente repetir a sequência: acordar, mamar, brincar um pouco, dormir.',
    'Diferencie dia e noite: luz e barulho normais de dia, escuro e silêncio à noite.',
    'Não vire refém do relógio. Rotina é um guia, não uma regra.',
  ], { fase: ['m2', 'm4'], f: 'SBP' });

  A('fotos-privacidade', 'dia', '📷', 'Fotos da Maya e privacidade', 'Pense antes de postar.', [
    'Combine com a Maíra o que pode ser compartilhado e com quem.',
    'Evite fotos com uniforme, nome completo, endereço ou local fixo da rotina.',
    'Evite fotos dela sem roupa e desligue a localização das fotos.',
    'Peça aos familiares que respeitem o combinado antes de postar.',
    'Fotos de ocasiões só para a família podem ir para um álbum compartilhado privado.',
  ], { fase: ['s1', 'm1'], f: 'SBP' });

  /* ---------- AMAMENTAÇÃO E MAMADEIRA ---------- */
  A('colostro', 'comer', '🥛', 'Colostro: o primeiro leite', 'Pouco, mas suficiente. É ouro.', [
    'Nos primeiros dias a Maíra produz o colostro: espesso e amarelado, em pequena quantidade.',
    'Ele é rico em defesas e é suficiente para o estômago do recém-nascido, que é do tamanho de uma cereja no 1º dia.',
    'Não precisa dar água, chá ou fórmula, a menos que o pediatra indique.',
    'O leite ‘desce’ geralmente entre o 2º e o 5º dia. As mamas ficam cheias e pesadas.',
    'Mame com frequência. Quanto mais o bebê mama, mais leite vem.',
  ], { fase: ['s1'], f: MS });

  A('pega-correta', 'comer', '👄', 'Pega correta: como saber', 'Pega boa não dói e o bebê esvazia a mama.', [
    'Boca bem aberta, lábios virados para fora, queixo encostado na mama.',
    'Mais aréola visível acima da boca do que abaixo, e nariz livre.',
    'Bochechas arredondadas, sem ‘covinhas’, sem estalos.',
    'Ritmo: sugadas longas e pausas, com deglutições audíveis.',
    'Se doer ou rachar, tire o bebê colocando o dedo no canto da boca e refaça a pega. Peça ajuda de uma consultora.',
  ], { fase: ['s1'], f: MS });

  A('posicoes-amamentar', 'comer', '🧘', 'Posições para amamentar', 'A melhor é a que for confortável para os dois.', [
    'Sentada, com o bebê no colo, barriga com barriga, cabeça e corpo alinhados.',
    'Posição ‘cavalinho’, bebê sentadinho de frente para a mama, ajuda no refluxo.',
    'Deitada de lado, com você ajudando a ajeitar o travesseiro, ótima para a noite e pós-cesárea.',
    'Posição ‘bola de futebol’, com o bebê sob o braço, funciona bem depois de cesárea.',
    'Use almofadas para apoiar. Seu papel é ajeitar e passar água.',
  ], { fase: ['s1'], f: MS });

  A('ordenhar-armazenar', 'comer', '🧊', 'Ordenhar e guardar o leite materno', 'Para quando a Maíra não puder estar presente.', [
    'Lave as mãos e use frasco de vidro com tampa plástica, fervido por 15 minutos.',
    'A ordenha pode ser manual ou com bomba. Escolha lugar tranquilo e limpo, longe de banheiro e animais.',
    'Etiquete o frasco com data e hora da ordenha.',
    'Na geladeira: até 12 horas, no fundo ou na prateleira mais fria, nunca na porta. No freezer: até 15 dias.',
    'Para usar, descongele na geladeira ou em banho-maria. Não ferva nem use micro-ondas.',
    'Leite aquecido e não consumido deve ser descartado.',
  ], { fase: ['s1', 'm1', 'm2'], d: 'Quando a Maíra estiver cansada, você pode dar o leite ordenhado na madrugada com copinho ou mamadeira, e ela descansa.', f: MS });

  A('ingurgitamento', 'comer', '🎈', 'Peito empedrado (ingurgitamento)', 'Acontece quando o leite desce.', [
    'As mamas ficam cheias, duras e doloridas, às vezes com um pouco de febre baixa.',
    'Mamar com frequência é o melhor remédio. Não passe muito tempo sem esvaziar.',
    'Massagem leve com a mão e compressa morna antes de mamar. Compressa fria depois para aliviar.',
    'Se o bebê não consegue pegar, ordenhar um pouco para amaciar a aréola.',
    'Evite deixar de amamentar. Se não melhorar em 24 a 48 horas, procure ajuda.',
  ], { fase: ['s1'], f: MS });

  A('mastite', 'comer', '🔥', 'Mastite: sinais para ficar atento', 'Inflamação na mama. Precisa de avaliação.', [
    'Áreas vermelhas, quentes, doloridas e endurecidas em uma das mamas.',
    'Febre e mal-estar, calafrios, cansaço intenso.',
    'Continue amamentando e esvaziando a mama, pois ajuda a tratar.',
    'Descanso, hidratação e ajuda com a casa. Esse é o seu trabalho.',
    'Procure o médico ou a UBS no mesmo dia. Pode precisar de tratamento.',
  ], { fase: ['s1', 'm1', 'm2'], a: ['Febre alta, mama muito vermelha e dolorida ou pus saindo pelo mamilo: atendimento no mesmo dia.'], f: MS });

  A('livre-demanda', 'comer', '⏰', 'Mamar quando o bebê quer', 'Sem relógio nos primeiros meses.', [
    'Recém-nascidos mamam de 8 a 12 vezes ao dia, algumas bem curtas, outras longas.',
    'Sinais de fome: mexer a cabeça, abrir a boca, levar a mão à boca. Choro é sinal tardio.',
    'Não precisa de horário. Se passar de 3 horas dormindo nas primeiras semanas, converse com o pediatra sobre acordar para mamar.',
    'Deixe esvaziar uma mama antes de oferecer a outra, para pegar o leite mais gordo do final.',
    'Use a aba Rotina para ver os intervalos sem precisar lembrar.',
  ], { fase: ['s1', 'm1'], f: MS });

  A('surto-crescimento', 'comer', '📈', 'Fase em que ela mama sem parar', 'Os ‘estirões’ de crescimento aparecem de tempos em tempos.', [
    'Em algumas semanas (por volta de 2 a 3 semanas, 6 semanas e 3 meses) o bebê pede mamada de hora em hora.',
    'Isso aumenta a produção de leite. Não significa que o leite é fraco.',
    'Aguente alguns dias oferecendo o peito com frequência. Ajude com água, comida e colo para a Maíra.',
    'Confirme que ela molha fraldas e ganha peso. Se tiver dúvidas, consulte o pediatra.',
    'Não corra para a mamadeira de fórmula sem orientação, pois pode diminuir o leite.',
  ], { fase: ['m1', 'm2'], f: MS });

  A('mamada-noite', 'comer', '🌙', 'Mamadas da madrugada: sua parte', 'Você pode fazer muito, mesmo sem amamentar.', [
    'Levante com ela: troque a fralda, traga o bebê e ajeite a Maíra com travesseiros e água.',
    'Depois da mamada, arrote, troque se precisar e coloque a Maya de volta no berço de barriga para cima.',
    'Mantenha luz baixa e voz calma. Quanto menos estímulo, mais rápido ela volta a dormir.',
    'Se ela estiver exausta, ofereça leite ordenhado no copinho ou mamadeira para ela dormir um bloco.',
    'Alternem noites quando possível.',
  ], { fase: ['s1', 'm1'], f: 'SBP' });

  A('formula-preparar', 'comer', '🥄', 'Preparar fórmula com segurança', 'Só quando indicada pelo pediatra.', [
    'Lave bem as mãos e a bancada. Use mamadeira e bico esterilizados.',
    'Use a água que o fabricante indica (geralmente fervida e resfriada). Siga as medidas da lata.',
    'Primeiro a água, depois o pó, com a medida rasa. Mais pó ou menos pó faz mal.',
    'Teste a temperatura pingando no antebraço: deve estar morna, não quente.',
    'Use a mamadeira em até 1 hora. O que sobrar vai fora.',
    'Mantenha a lata fechada, em local seco e fresco, e confira a validade.',
  ], { fase: ['s1', 'm1', 'm2'], a: ['Não troque de fórmula nem dilua por conta própria. Fale com o pediatra.'], f: 'ANVISA e Ministério da Saúde' });

  A('esterilizar-mamadeira', 'comer', '🫧', 'Limpar e esterilizar mamadeiras', 'Todo uso exige lavagem.', [
    'Lave logo após o uso com água quente e detergente, com escova própria. Enxágue bem.',
    'Desmonte todas as peças: bico, anel, tampa e frasco.',
    'Ferva as peças por 5 a 10 minutos em panela limpa, ou use um esterilizador.',
    'Escorra em local limpo e guarde tampada, sem tocar nas partes que ficam na boca.',
    'Troque o bico se estiver rachado ou grudento.',
  ], { fase: ['s1', 'm1'], f: 'SBP' });

  A('regurgitacao', 'comer', '🤢', 'Cuspir leite: normal ou preocupante', 'Muito comum nos primeiros meses.', [
    'Pequenas golfadas depois de mamar são normais, se ela ganha peso e está tranquila.',
    'Deixe-a na vertical por 15 a 20 minutos depois de mamar e evite balançar muito.',
    'Evite que fique muito cheia. Mamadas menores e mais frequentes podem ajudar.',
    'Troque a roupa e a fralda sem pressa. Tenha paninhos por perto.',
    'Se ela cuspir com mais frequência, o pediatra avalia.',
  ], { fase: ['s1', 'm1', 'm2'], a: ['Vômito em jato, verde, com sangue, bebê muito sonolento, barriga dura, perda de peso ou recusa em mamar: pronto-socorro.'], f: 'SBP' });

  A('solucos-bebe', 'comer', '😮', 'Soluços do bebê', 'Quase sempre inofensivos.', [
    'Soluço é comum, principalmente depois de mamar.',
    'Pare um pouco, faça-a arrotar e mantenha na vertical.',
    'Não precisa assustar, dar água ou tapas.',
    'Geralmente passa em poucos minutos sozinho.',
    'Se soluços forem muito frequentes ou com choro e engasgo, converse com o pediatra.',
  ], { fase: ['s1', 'm1'], f: 'SBP' });

  A('esta-satisfeita', 'comer', '😌', 'Como saber que ela mamou bem', 'Sinais de que o leite está sendo suficiente.', [
    'Solta o peito sozinha, parece relaxada, mãos abertas, sono tranquilo depois.',
    'Fraldas molhadas: a partir do 5º dia, ao menos 6 por dia, com xixi claro.',
    'Cocôs mudam de preto e grudento para verde e depois amarelo, a partir do 3º ao 5º dia.',
    'Ganha peso depois da primeira semana e volta ao peso de nascimento em até uns 14 dias.',
    'Se estiver sempre chorando de fome, com poucas fraldas ou perdendo peso, fale com o pediatra.',
  ], { fase: ['s1'], f: MS });

  A('mae-amamentando-cuidados', 'comer', '🫖', 'Cuidados da Maíra enquanto amamenta', 'O leite depende de uma mãe bem cuidada.', [
    'Boa alimentação variada e bastante líquido. Não precisa de dieta especial.',
    'Descanso sempre que possível. Durma quando o bebê dormir.',
    'Não use remédios, chás ou ervas sem falar com o médico. Evite álcool e cigarro.',
    'Cafeína em quantidade pequena costuma ser tranquila. Observe a reação da Maya.',
    'Lanche e água perto do lugar de amamentar. Esse é o seu trabalho.',
  ], { fase: ['s1', 'm1', 'm2'], f: MS });

  A('desmame', 'comer', '🌿', 'Quando e como parar de amamentar', 'Decisão da Maíra, sem pressão.', [
    'A recomendação é amamentar até 2 anos ou mais, com leite materno exclusivo até 6 meses.',
    'Se a Maíra decidir parar antes, faça de forma gradual: tirar uma mamada por vez, a cada poucos dias.',
    'Substitua por colo, brincadeira e alimentos. Seu papel no desmame é muito importante.',
    'Evite parar de repente, o que pode causar dor e mastite.',
    'Respeite o ritmo do bebê e o da mãe. Procure ajuda se ficar difícil.',
  ], { fase: ['m10'], f: MS });

  /* ---------- INTRODUÇÃO ALIMENTAR ---------- */
  A('quando-comecar-comida', 'alim', '🥣', 'Quando começar a comer', 'Aos 6 meses, com sinais de prontidão.', [
    'Até 6 meses, só leite materno, sem água, chá ou suco.',
    'A partir dos 6 meses, o leite continua e entram os alimentos, aos poucos.',
    'Sinais de prontidão: senta com apoio, sustenta a cabeça, tem interesse na comida e leva objetos à boca.',
    'Não comece antes dos 6 meses por conta própria, a menos que o pediatra oriente.',
    'Escolha um horário em que ela esteja descansada e não muito faminta.',
  ], { fase: ['m4', 'm7'], f: GA });

  A('primeira-refeicao', 'alim', '🍠', 'A primeira refeição', 'O objetivo é conhecer, não encher a barriga.', [
    'Comece com 1 a 2 refeições por dia, em colherinha de papinha ou pedaços macios.',
    'Ofereça um alimento novo por vez e observe por alguns dias.',
    'Pode ser legumes cozidos e amassados, tubérculos, feijão, carne desfiada, ovo bem cozido.',
    'Ofereça com paciência. Pode ser preciso até 8 a 10 vezes para aceitar.',
    'Respeite os sinais: virar a cabeça, fechar a boca ou empurrar a colher quer dizer ‘chega’.',
  ], { fase: ['m4', 'm7'], f: GA });

  A('tradicional-ou-blw', 'alim', '🥄', 'Papinha ou pedaços (BLW)?', 'Os dois funcionam, com cuidados.', [
    'Papinha tradicional: alimentos amassados, oferecidos na colher pelo adulto.',
    'BLW (bebê come sozinho): pedaços macios do tamanho de um bastão que ela pega com a mão.',
    'Pode combinar os dois. O importante é variar e respeitar o apetite.',
    'Em qualquer método, bebê sentado, ereto, sempre supervisionado, sem tela.',
    'Converse com o pediatra sobre o que combina mais com vocês.',
  ], { fase: ['m4', 'm7'], f: 'SBP e Ministério da Saúde' });

  A('alimentos-evitar', 'alim', '🚫', 'O que não dar antes dos 2 anos', 'Alguns alimentos fazem mal ou aumentam riscos.', [
    'Mel: pode conter bactéria do botulismo. Não oferecer antes de 1 ano (o Ministério da Saúde recomenda evitar até 2 anos).',
    'Açúcar, doces, refrigerantes, sucos de caixinha, bolachas recheadas e biscoitos industrializados.',
    'Sal em excesso, caldos prontos e temperos industrializados. Use temperos naturais.',
    'Ultraprocessados: salsicha, nuggets, macarrão instantâneo, salgadinhos.',
    'Leite de vaca como bebida principal antes de 1 ano.',
    'Chás e adoçantes. Sucos, mesmo naturais, são desnecessários.',
  ], { l: 1, fase: ['m4', 'm7', 'm10'], f: GA });

  A('ansia-ou-engasgo', 'alim', '😖', 'Ânsia ou engasgo: como diferenciar', 'Gagging não é engasgo.', [
    'Ânsia (gag): bebê faz careta, tosse, fica com os olhos cheios de água, mas respira e chora. É um reflexo de proteção.',
    'Deixe que ela resolva. Não coloque o dedo na boca nem bata nas costas.',
    'Engasgo verdadeiro: não faz som, não tosse, não consegue respirar, lábios ficam roxos.',
    'Neste caso, chame ajuda (192) e faça as manobras de desengasgo (veja o guia de Urgência).',
    'Fique sempre perto, com atenção total durante as refeições.',
  ], { fase: ['m4', 'm7'], a: ['Engasgo total é emergência. Ligue 192 e inicie as manobras.'], f: 'SBP' });

  A('alimentos-engasgam', 'alim', '🍇', 'Alimentos que mais engasgam', 'Como cortar e preparar.', [
    'Uva, tomate-cereja e azeitona: corte no sentido do comprimento em quatro partes.',
    'Salsicha e linguiça: evitar. Se for dar, corte em tiras finas.',
    'Cenoura, maçã e pera crua: rale, cozinhe ou ofereça em tiras macias. Nunca em pedaços duros.',
    'Amendoim, castanhas, pipoca, balas, chiclete: não oferecer a bebês pequenos. Nozes e amendoim podem ser dados em pasta diluída.',
    'Pedaços de carne: desfie ou moa. Pães e bolachas duras: amoleça.',
    'Nada de deixar a Maya comer correndo, deitada ou no carro.',
  ], { l: 1, fase: ['m7', 'm10'], f: 'SBP' });

  A('texturas', 'alim', '🍌', 'Evolução das texturas', 'Aos poucos, a comida vai ficando mais parecida com a da família.', [
    '6 meses: alimentos bem amassados com garfo, ou em pedaços macios para pegar com a mão.',
    '7 a 9 meses: amassados grossos, pedaços macios, desfiados.',
    '9 a 11 meses: pedaços pequenos, comida cortada e mais variada.',
    '12 meses: já pode comer a comida da família, com pouco sal, sem açúcar e bem cozida.',
    'Dar sempre atenção ao tamanho dos pedaços e ao risco de engasgo.',
  ], { l: 1, fase: ['m7', 'm10'], f: GA });

  A('grupos-alimentares', 'alim', '🥕', 'Um prato equilibrado', 'Cada refeição com cereal, leguminosa, proteína e vegetais.', [
    'Cereal ou tubérculo: arroz, batata, mandioca, inhame, milho.',
    'Leguminosa: feijão, lentilha, grão-de-bico, ervilha.',
    'Proteína: carne, frango, peixe, ovo (bem cozidos), sempre desfiados.',
    'Legumes e verduras: cenoura, abóbora, brócolis, couve, chuchu.',
    'Frutas como sobremesa ou lanche, inteiras amassadas ou raspadas.',
    'Ferro é prioridade: feijão, carnes, ovos e verduras escuras ajudam.',
  ], { l: 1, fase: ['m7', 'm10'], f: GA });

  A('agua-bebe', 'alim', '💧', 'Água para o bebê', 'Entra junto com a comida.', [
    'Antes de 6 meses, ela não precisa de água, só do leite.',
    'Depois dos 6 meses, ofereça água potável filtrada ou fervida entre as refeições, em copo.',
    'Sem açúcar, sem chá doce, sem suco no lugar da água.',
    'Quantidade pequena, de acordo com a vontade dela. Não force.',
    'Em dias muito quentes ou com diarreia, fale com o pediatra sobre o que oferecer.',
  ], { fase: ['m4', 'm7'], f: GA });

  A('alergenos', 'alim', '🥜', 'Alimentos que causam alergia', 'Introduzir cedo e com cuidado costuma ser melhor que adiar.', [
    'Ovo, leite de vaca (em preparações), trigo, soja, peixe, castanhas e amendoim são os mais comuns.',
    'A recomendação atual é não adiar a introdução, e sim oferecer com cuidado depois que ela já aceita outros alimentos.',
    'Ofereça um novo alimento por vez, em pequena quantidade, e observe por algumas horas e dias.',
    'Se tiver histórico de alergia na família ou eczema forte, converse com o pediatra antes.',
    'Amendoim e castanhas: nunca inteiros. Use pasta diluída ou pó misturado à papinha.',
  ], { fase: ['m4', 'm7'], a: ['Inchaço no rosto, urticária, vômitos repetidos, chiado, palidez ou moleza logo após comer: pronto-socorro (192).'], f: 'SBP' });

  A('cadeira-refeicao', 'alim', '🪑', 'Cadeirinha de refeição e ambiente', 'Segurança e hábito.', [
    'Use cadeira com cinto, bem apoiada, para ela ficar sentada reta com os pés apoiados.',
    'Nunca deixe sozinha comendo. Um adulto sempre perto, olhando.',
    'Sem TV, celular ou brinquedos na mesa. Coma junto, sempre que possível.',
    'Deixe sujar. Explorar com as mãos faz parte do aprendizado.',
    'Refeição leva em torno de 20 a 30 minutos. Não prolongue demais.',
  ], { fase: ['m4', 'm7'], f: GA });

  A('recusa-comida', 'alim', '🙅', 'Ela não quer comer', 'Normal. A insistência calma é o caminho.', [
    'Uma criança pequena pode precisar de 8 a 10 tentativas para aceitar um alimento novo.',
    'Não force, não negocie com sobremesa, nem distraia com telas.',
    'Ofereça o mesmo alimento de formas diferentes: amassado, em tiras, misturado.',
    'Dê o exemplo: coma junto com ela e mostre que gosta.',
    'Se ela perde peso, recusa tudo por dias ou tem engasgos frequentes, converse com o pediatra.',
  ], { fase: ['m7', 'm10'], f: GA });

  A('sal-temperos', 'alim', '🧂', 'Sal, temperos e óleo', 'Sabor natural vem primeiro.', [
    'Use temperos naturais: alho, cebola, salsinha, cebolinha, ervas.',
    'Sal em quantidade mínima. Evite caldos em cubinho e temperos prontos.',
    'Use pouco óleo de cozinha ou azeite.',
    'Pimenta e comidas picantes ficam para depois.',
    'Prepare a comida da família sem excesso de sal para que a Maya possa comer a mesma.',
  ], { fase: ['m7', 'm10'], f: GA });

  A('papinha-conservar', 'alim', '🧊', 'Preparar e guardar a comida da Maya', 'Higiene e praticidade.', [
    'Lave bem as mãos, os alimentos e os utensílios. Cozinhe tudo até ficar macio.',
    'Prepare em porções pequenas, resfrie rápido e guarde em potes limpos e tampados.',
    'Na geladeira, consuma em até 1 a 2 dias. No freezer, etiquete com a data e use em poucas semanas.',
    'Descongele na geladeira, nunca fora dela, e aqueça só o que for usar.',
    'Sobras do prato dela não voltam à geladeira.',
  ], { fase: ['m7'], f: GA });

  A('leite-vaca-12m', 'alim', '🥛', 'Leite de vaca depois de 1 ano', 'Pode entrar, sem substituir as refeições.', [
    'Antes de 1 ano, não é recomendado como bebida principal.',
    'Depois de 1 ano, pode ser oferecido em quantidade moderada, no copo, sem açúcar e sem achocolatado.',
    'Siga com o leite materno enquanto a Maíra quiser e a Maya desejar.',
    'Excesso de leite tira o apetite e atrapalha o ferro. Cuidado com o consumo.',
    'Combine com o pediatra o tipo e a quantidade.',
  ], { fase: ['m10'], f: GA });

  A('copo-canudo', 'alim', '🥤', 'Do bico ao copo', 'Treinar cedo ajuda os dentes e a fala.', [
    'A partir dos 6 meses, deixe a Maya experimentar água em copinho aberto, com ajuda.',
    'Prefira copo aberto ou com canudo macio, em vez de copos com bico duro por muito tempo.',
    'Aos poucos, retire a mamadeira, principalmente à noite. Faça isso até 1 ano a 2 anos.',
    'Segure o copo no começo. Ela vai errar e molhar. É assim que aprende.',
    'Não ofereça água adoçada nem sucos na mamadeira.',
  ], { fase: ['m7', 'm10'], f: 'SBP' });
})();
